"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { deleteAllLinks } from "@/app/actions/delete-all-links";

interface DeleteAllButtonProps {
  linkCount: number;
}

export function DeleteAllButton({ linkCount }: DeleteAllButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteAll() {
    if (linkCount === 0) {
      return;
    }

    const confirmed = confirm(
      `⚠️ WARNING: This will permanently delete ALL ${linkCount} link${linkCount === 1 ? "" : "s"}!\n\nThis action CANNOT be undone.\n\nAre you absolutely sure?`
    );

    if (!confirmed) {
      return;
    }

    // Double confirmation for safety
    const doubleConfirm = confirm(
      `Are you REALLY sure you want to delete all ${linkCount} link${linkCount === 1 ? "" : "s"}?\n\nClick OK to confirm deletion.`
    );

    if (!doubleConfirm) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteAllLinks();
      
      if (result.success) {
        alert(`✓ ${result.message}`);
        window.location.reload();
      } else {
        alert(result.error || "Failed to delete links");
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting all links:", error);
      alert("An unexpected error occurred");
      setIsDeleting(false);
    }
  }

  return (
    <Button
      onClick={handleDeleteAll}
      disabled={isDeleting || linkCount === 0}
      variant="destructive"
      className="gap-2"
    >
      {isDeleting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="h-4 w-4" />
          Delete All Links ({linkCount})
        </>
      )}
    </Button>
  );
}
