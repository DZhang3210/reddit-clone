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
    <div className="border-2 border-black bg-[#374151] rounded-xl mb-0">
      <div className="flex gap-1 mb-1 bg-gray-600 pl-2 rounded-t-xl">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "p-1 my-1 transition hover:bg-gray-500 rounded-lg",
            editor.isActive("bold") && "bg-gray-500"
          )}
        >
          <BoldIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-1 my-1 transition hover:bg-gray-500 rounded-lg",
            editor.isActive("italic") && "bg-gray-500"
          )}
        >
          <ItalicIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "p-1 my-1 transition hover:bg-gray-500 rounded-lg",
            editor.isActive("underline") && "bg-gray-500"
          )}
        >
          <UnderlineIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-1 my-1 transition hover:bg-gray-500 rounded-lg",
            editor.isActive("bulletList") && "bg-gray-500"
          )}
        >
          <ListIcon />
        </button>
      </div>
      <div className="p-2 border-2 border-gray-500 rounded-b-xl space-y-1">
        <EditorContent
          editor={editor}
          className="prose max-w-none editContent border-b-2 border-gray-500 border-b-xl"
        />
        <div className="flex justify-between m-0">
          <EmojiPicker
            onEmojiSelect={(emoji) => editor.commands.insertContent(emoji)}
          />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
