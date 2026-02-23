"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { deleteLink } from "@/app/actions/delete-link";

interface DeleteButtonProps {
  linkId: number;
  shortCode: string;
}

export function DeleteButton({ linkId, shortCode }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete the short link "/${shortCode}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteLink(linkId);
      
      if (result.success) {
        // The page will automatically refresh due to revalidatePath in the server action
        window.location.reload();
      } else {
        alert(result.error || "Failed to delete link");
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("An unexpected error occurred");
      setIsDeleting(false);
    }
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950"
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
