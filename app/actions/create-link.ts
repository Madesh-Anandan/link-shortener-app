"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function generateShortCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function isShortCodeTaken(shortCode: string): Promise<boolean> {
  const existing = await db.select().from(links).where(eq(links.shortCode, shortCode)).limit(1);
  return existing.length > 0;
}

export async function createLink(formData: FormData) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: "You must be logged in to create links" };
    }

    const url = formData.get("url") as string;
    const customCode = formData.get("customCode") as string;

    if (!url) {
      return { success: false, error: "URL is required" };
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return { success: false, error: "Invalid URL format" };
    }

    // Generate or use custom short code
    let shortCode = customCode?.trim();
    
    if (shortCode) {
      // Validate custom code
      if (!/^[a-zA-Z0-9-_]+$/.test(shortCode)) {
        return { success: false, error: "Short code can only contain letters, numbers, hyphens, and underscores" };
      }
      
      // Check if taken
      if (await isShortCodeTaken(shortCode)) {
        return { success: false, error: "This short code is already taken" };
      }
    } else {
      // Generate random code
      let attempts = 0;
      do {
        shortCode = generateShortCode();
        attempts++;
        if (attempts > 10) {
          return { success: false, error: "Failed to generate unique short code. Please try again." };
        }
      } while (await isShortCodeTaken(shortCode));
    }

    // Insert into database
    const [newLink] = await db.insert(links).values({
      shortCode,
      url,
      userId,
    }).returning();

    revalidatePath("/dashboard");

    return {
      success: true,
      data: {
        shortCode: newLink.shortCode,
        url: newLink.url,
      },
    };
  } catch (error) {
    console.error("Error creating link:", error);
    return { success: false, error: "Failed to create link" };
  }
}
