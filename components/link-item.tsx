"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { DeleteButton } from "@/components/delete-button";

interface LinkItemProps {
  link: {
    id: number;
    shortCode: string;
    url: string;
    createdAt: Date;
  };
}

export function LinkItem({ link }: LinkItemProps) {
  // Get the actual browser URL (client-side only)
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const shortUrl = baseUrl ? `${baseUrl}/${link.shortCode}` : `/${link.shortCode}`;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              🌐 Short Link (PUBLIC - Anyone can access)
            </p>
            <div className="flex items-center gap-2">
              <code className="rounded bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {shortUrl}
              </code>
              <CopyButton textToCopy={shortUrl} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              📍 Redirects to
            </p>
            <p className="truncate text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 rounded px-3 py-1.5 border border-zinc-200 dark:border-zinc-800">
              {link.url}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" asChild>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open link in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <DeleteButton linkId={link.id} shortCode={link.shortCode} />
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-2">
        <Calendar className="h-3 w-3" />
        <span>
          Created {new Date(link.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
