"use client";

import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { createNote } from "@/actions/notes/create-note";
import { updateNote } from "@/actions/notes/update-note";

import { Button } from "@/components/ui/button";
import { ReminderPicker } from "./reminder-picker";

interface NoteEditorProps {
  mode: "create" | "edit";

  note?: {
    id: string;
    title: string;
    content: string;

    isPinned: boolean;
    isArchived: boolean;

    remindAt: Date | null;

    createdAt: Date;
    updatedAt: Date;
  };

  onSuccess?: () => void;
}

export function NoteEditor({
  note,
  onSuccess,
}: NoteEditorProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [title, setTitle] = useState(
    note?.title ?? ""
  );

  const [content, setContent] =
    useState(note?.content ?? "");

  const [reminder, setReminder] =
    useState<Date | null>(
      note?.remindAt ?? null
    );

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  function handleSubmit() {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = note
        ? await updateNote({
            id: note.id,
            title,
            content,
            remindAt: reminder,
          })
        : await createNote({
            title,
            content,
            remindAt: reminder,
          });

      if (result.error) {
        setError(result.error);
        return;
      }

      setSuccess(result.success ?? "");

      router.refresh();

      if (!note) {
        setTitle("");
        setContent("");
        setReminder(null);
      }

      onSuccess?.();
    });
  }

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-[#111A1F]">
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        disabled={isPending}
        className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-lg font-semibold outline-none transition focus:border-[#6A89A7] dark:border-slate-700"
      />

      <textarea
        placeholder="Start writing..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        disabled={isPending}
        rows={10}
        className="w-full resize-none rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-[#6A89A7] dark:border-slate-700"
      />

      <ReminderPicker
        value={reminder}
        onChange={setReminder}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {success && (
        <p className="text-sm text-green-600">
          {success}
        </p>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending
            ? note
              ? "Saving..."
              : "Creating..."
            : note
            ? "Save Changes"
            : "Create Note"}
        </Button>
      </div>
    </div>
  );
}