"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteAllLinks() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: "You must be logged in to delete links" };
    }

    // Delete all links belonging to the user
    const result = await db
      .delete(links)
      .where(eq(links.userId, userId))
      .returning();

    revalidatePath("/dashboard");

    return {
      success: true,
      message: `Successfully deleted ${result.length} link${result.length === 1 ? "" : "s"}`,
      count: result.length,
    };
  } catch (error) {
    console.error("Error deleting all links:", error);
    return { success: false, error: "Failed to delete links" };
  }
}
