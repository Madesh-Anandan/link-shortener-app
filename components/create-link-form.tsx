"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { Input } from "../components/ui/input"; // Update this path if your Input component is located elsewhere
import { createLink } from "@/app/actions/create-link";
import { CopyButton } from "@/components/copy-button";
import { getBaseUrl } from "@/lib/get-base-url";
import { Loader2 } from "lucide-react";

export function CreateLinkForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ shortCode: string; url: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await createLink(formData);
      
      if (result.success && result.data) {
        setSuccess({
          shortCode: result.data.shortCode,
          url: result.data.url,
        });
        // Reset form
        const form = document.getElementById("create-link-form") as HTMLFormElement;
        form?.reset();
        
        // Refresh the page after 5 seconds to show the new link in the list
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        setError(result.error || "Failed to create link");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const baseUrl = getBaseUrl();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Short Link</CardTitle>
        <CardDescription>
          Enter a URL and optionally choose a custom short code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="create-link-form" action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Original URL
            </label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com/very/long/url"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="customCode" className="text-sm font-medium">
              Custom Short Code (optional)
            </label>
            <Input
              id="customCode"
              name="customCode"
              type="text"
              placeholder="my-link"
              pattern="[a-zA-Z0-9-_]+"
              title="Only letters, numbers, hyphens, and underscores"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to generate a random code
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {success && (
            <div className="space-y-3 rounded-md bg-green-500/10 p-4 border border-green-500/20">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                ✓ Link created successfully!
              </p>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-green-700 dark:text-green-300">
                  🌐 Your PUBLIC shortened link (anyone can use):
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded bg-muted px-3 py-2 text-sm font-mono">
                    {baseUrl}/{success.shortCode}
                  </code>
                  <CopyButton textToCopy={`${baseUrl}/${success.shortCode}`} />
                </div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 rounded px-2 py-1">
                ℹ️ This link is PUBLIC - no login required. Share it with anyone!
              </p>
              <p className="text-xs text-muted-foreground italic">
                Page will refresh in 5 seconds to show your new link...
              </p>
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Creating..." : "Create Short Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}