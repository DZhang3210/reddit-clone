import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  className?: string;
}

const ReadOnly = ({ content, className }: RichTextEditorProps) => {
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
    editable: false,
    content,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="">
      <EditorContent
        editor={editor}
        className={cn("prose max-w-none text-sm text-gray-400", className)}
      />
    </div>
  );
};

export default ReadOnly;
