import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2 } from "lucide-react";
import { CreateLinkForm } from "@/components/create-link-form";
import { LinkItem } from "@/components/link-item";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  // Fetch user's links from database
  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage and track your shortened links
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <CreateLinkForm />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Links</CardTitle>
                <CardDescription>
                  {userLinks.length === 0
                    ? "No links yet. Create your first one!"
                    : `${userLinks.length} link${userLinks.length === 1 ? "" : "s"}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userLinks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Link2 className="mb-4 h-12 w-12 text-zinc-400 dark:text-zinc-600" />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Create your first short link to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userLinks.map((link) => (
                      <LinkItem key={link.id} link={link} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


