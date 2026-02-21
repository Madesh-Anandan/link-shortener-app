import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

interface PageProps {
  params: Promise<{
    shortCode: string;
  }>;
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortCode } = await params;

  // Look up the short code in the database
  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  // If not found, show 404
  if (result.length === 0) {
    notFound();
  }

  const link = result[0];

  // Redirect to the original URL
  redirect(link.url);
}
