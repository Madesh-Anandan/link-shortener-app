"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteLink(linkId: number) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: "You must be logged in to delete links" };
    }

    // Delete the link (only if it belongs to the user)
    const result = await db
      .delete(links)
      .where(and(eq(links.id, linkId), eq(links.userId, userId)))
      .returning();

    if (result.length === 0) {
      return { success: false, error: "Link not found or you don't have permission to delete it" };
    }

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Link deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting link:", error);
    return { success: false, error: "Failed to delete link" };
  }
}
