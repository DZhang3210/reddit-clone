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
import { Button } from "../ui/button";

interface CommentEditorProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  onCancel: () => void;
}

const CommentEditor = ({
  content,
  setContent,
  onSubmit,
  onCancel,
}: CommentEditorProps) => {
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
    <div className="border-2 border-black bg-gray-200 rounded-xl mb-0 w-full">
      <div className="flex gap-1 bg-gray-300 rounded-t-xl">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "p-1 my-1 transition hover:bg-gray-500 rounded-lg text-black",
            editor.isActive("bold") && "bg-gray-400"
          )}
        >
          <BoldIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-1 my-1 transition hover:bg-gray-500 rounded-lg text-black",
            editor.isActive("italic") && "bg-gray-400"
          )}
        >
          <ItalicIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "p-1 my-1 transition hover:bg-gray-500 rounded-lg text-black",
            editor.isActive("underline") && "bg-gray-400"
          )}
        >
          <UnderlineIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-1 my-1 transition hover:bg-gray-500 rounded-lg text-black",
            editor.isActive("bulletList") && "bg-gray-400"
          )}
        >
          <ListIcon />
        </button>
      </div>
      <div className="border-2 border-gray-500 rounded-b-xl">
        <EditorContent
          editor={editor}
          className="prose max-w-none editContent border-b-2 border-gray-500 border-b-xl text-black"
        />
        <div className="flex justify-between items-center m-0 bg-gray-300">
          <EmojiPicker
            onEmojiSelect={(emoji) => editor.commands.insertContent(emoji)}
          />
          <div className="flex gap-2 p-2">
            <Button
              className="rounded-full bg-black text-white px-4 text-xs"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className="rounded-full bg-blue-600 text-white px-4 text-xs"
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
