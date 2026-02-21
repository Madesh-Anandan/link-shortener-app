import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, ExternalLink, Calendar } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { CreateLinkForm } from "@/components/create-link-form";
import { getBaseUrl } from "@/lib/get-base-url";

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

  const baseUrl = getBaseUrl();

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
                      <div
                        key={link.id}
                        className="flex flex-col gap-4 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-1 overflow-hidden">
                            <div className="flex items-center gap-2">
                              <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                {baseUrl}/{link.shortCode}
                              </code>
                              <CopyButton textToCopy={`${baseUrl}/${link.shortCode}`} />
                            </div>
                            <p className="truncate text-sm text-zinc-600 dark:text-zinc-400">
                              {link.url}
                            </p>
                          </div>
                          <Button size="sm" variant="ghost" asChild>
                            <a
                              href={`${baseUrl}/${link.shortCode}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                          <Calendar className="h-3 w-3" />
                          <span>
                            Created {new Date(link.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
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


