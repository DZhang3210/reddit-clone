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
import { Dispatch, SetStateAction, useState } from "react";

interface RichTextEditorProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const RichTextEditor = ({ content, setContent }: RichTextEditorProps) => {
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

  if (!editor) {
    return null;
  }

  return (
    <div className=" bg-[#374151] rounded-3xl mb-0">
      {open && (
        <div className="flex gap-2 mb-1rounded-t-xl items-center ml-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "p-1 my-1 transition hover:bg-gray-500 rounded-lg",
              editor.isActive("bold") && "bg-gray-500"
            )}
          >
            <BoldIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "p-1 my-1 transition hover:bg-gray-500 rounded-lg",
              editor.isActive("italic") && "bg-gray-500"
            )}
          >
            <ItalicIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn(
              "p-1 my-1 transition hover:bg-gray-500 rounded-lg",
              editor.isActive("underline") && "bg-gray-500"
            )}
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "p-1 my-1 transition hover:bg-gray-500 rounded-lg",
              editor.isActive("bulletList") && "bg-gray-500"
            )}
          >
            <ListIcon className="w-4 h-4" />
          </button>
          <EmojiPicker
            onEmojiSelect={(emoji) => editor.commands.insertContent(emoji)}
          />
        </div>
      )}
      <div className="p-2 rounded-b-xl space-y-1">
        <EditorContent
          editor={editor}
          className="prose max-w-none min-h-[50px] cursor-white"
        />
      </div>
      <div className="pb-1">
        <button onClick={() => setOpen(!open)} className="ml-4 text-white">
          <ArrowUpIcon className={cn("w-4 h-4", open && "rotate-180")} />
        </button>
      </div>
    </div>
  );
};

export default RichTextEditor;
