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
import { BoldIcon, ItalicIcon, UnderlineIcon, ListIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface RichTextEditorProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const RichTextEditor = ({ content, setContent }: RichTextEditorProps) => {
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
    <div className="border rounded-md p-4">
      <div className="flex gap-2 mb-2 border-2 *:mx-2 *:my-1 *:rounded-lg">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "p-2 transition",
            editor.isActive("bold") && "bg-gray-500"
          )}
        >
          <BoldIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-2 transition",
            editor.isActive("italic") && "bg-gray-500"
          )}
        >
          <ItalicIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "p-2 transition",
            editor.isActive("underline") && "bg-gray-500"
          )}
        >
          <UnderlineIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-2 transition",
            editor.isActive("bulletList") && "bg-gray-500"
          )}
        >
          <ListIcon />
        </button>
        <EmojiPicker
          onEmojiSelect={(emoji) => editor.commands.insertContent(emoji)}
        />
      </div>
      <EditorContent editor={editor} className="prose max-w-none editContent" />
    </div>
  );
};

export default RichTextEditor;
