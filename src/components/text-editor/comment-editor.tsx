"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import { EmojiPicker } from "./emoji-picker";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListIcon,
  ArrowUpIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { TooltipHover } from "../tooltip-hover";

interface CommentEditorProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  onCancel: () => void;
  mainEditor?: boolean;
}

const CommentEditor = ({
  content,
  setContent,
  onSubmit,
  onCancel,
  mainEditor = false,
}: CommentEditorProps) => {
  const [open, setOpen] = useState(false);
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      BulletList,
      ListItem,
      History,
      Placeholder.configure({
        placeholder: "Type something...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Update editor content when the content prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
    console.log("Content", content);
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border-2 border-gray-500 rounded-3xl my-5 w-full">
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          open ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex gap-1 rounded-xl items-center ml-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "p-2 my-1 transition hover:bg-gray-300 rounded-full text-gray-300",
              editor.isActive("bold") && "bg-blue-200"
            )}
            aria-label="bold-trigger"
          >
            <BoldIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "p-2 my-1 transition hover:bg-gray-300 rounded-full text-gray-300",
              editor.isActive("italic") && "bg-gray-400"
            )}
            aria-label="italic-trigger"
          >
            <ItalicIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              "p-2 my-1 transition hover:bg-gray-300 rounded-full text-gray-300",
              editor.isActive("underline") && "bg-gray-400"
            )}
            aria-label="underline-trigger"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "p-2 my-1 transition hover:bg-gray-300 rounded-full text-gray-300",
              editor.isActive("bulletList") && "bg-gray-400"
            )}
            aria-label="list-trigger"
          >
            <ListIcon className="w-4 h-4" />
          </button>
          <EmojiPicker
            onEmojiSelect={(emoji) => editor.commands.insertContent(emoji)}
            aria-label="emoji-picker"
          />
        </div>
      </div>
      <div className=" rounded-b-xl">
        <EditorContent
          editor={editor}
          className="prose max-w-none editContent border-b-xl min-h-[20px]  p-3 text-gray-100 rounded-full caret-white text-xs"
        />
        <div className="flex justify-between items-center m-0 px-2">
          <TooltipHover content="Formatting">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-300 ml-2"
              aria-label="formatting-trigger"
            >
              <ArrowUpIcon className={cn("w-4 h-4", open && "rotate-180")} />
            </button>
          </TooltipHover>

          <div className="flex gap-2 py-2 items-center">
            {!mainEditor && (
              <button
                className="rounded-full text-white px-4 py-4 text-xs h-[30px] hover:bg-gray-300/40 flex items-center justify-center"
                onClick={onCancel}
                aria-label="cancel button"
              >
                Cancel
              </button>
            )}
            <button
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-4 text-xs h-[30px] flex items-center justify-center"
              onClick={onSubmit}
              aria-label="submit button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentEditor;
