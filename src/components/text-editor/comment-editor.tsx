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
import { Button } from "../ui/button";
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
    <div className="border-2 border-gray-500 bg-gray-100 rounded-3xl my-5 w-full">
      {open && (
        <div className="flex gap-1 rounded-xl items-center ml-3 ">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "p-2 my-1 transition hover:bg-gray-300 rounded-full text-black",
              editor.isActive("bold") && "bg-blue-200"
            )}
          >
            <BoldIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "p-2 my-1 transition hover:bg-gray-300 rounded-full text-black",
              editor.isActive("italic") && "bg-gray-400"
            )}
          >
            <ItalicIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              "p-2 my-1 transition hover:bg-gray-300 rounded-full text-black",
              editor.isActive("underline") && "bg-gray-400"
            )}
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "p-2 my-1 transition hover:bg-gray-300 rounded-full text-black",
              editor.isActive("bulletList") && "bg-gray-400"
            )}
          >
            <ListIcon className="w-4 h-4" />
          </button>
          <EmojiPicker
            onEmojiSelect={(emoji) => editor.commands.insertContent(emoji)}
          />
        </div>
      )}
      <div className=" rounded-b-xl">
        <EditorContent
          editor={editor}
          className="prose max-w-none editContent border-b-xl min-h-[20px]  p-3 text-black rounded-full caret-black text-sm"
        />
        <div className="flex justify-between items-center m-0 px-2">
          <TooltipHover content="Formatting">
            <button onClick={() => setOpen(!open)} className="text-black ml-2">
              <ArrowUpIcon className={cn("w-4 h-4", open && "rotate-180")} />
            </button>
          </TooltipHover>

          <div className="flex gap-2 py-2">
            {!mainEditor && (
              <Button
                className="rounded-full bg-black text-white px-4 text-xs h-[30px]"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button
              className="rounded-full bg-orange-600 text-white px-4 text-xs h-[30px]"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentEditor;
