"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface BlogEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

const BlogEditor = ({
  initialContent = "",
  onChange,
}: BlogEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[350px] w-full px-4 py-3 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const active = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) {
        return {
          bold: false,
          italic: false,
          strike: false,
          h2: false,
          h3: false,
          bulletList: false,
          orderedList: false,
          blockquote: false,
        };
      }

      return {
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        strike: editor.isActive("strike"),
        h2: editor.isActive("heading", { level: 2 }),
        h3: editor.isActive("heading", { level: 3 }),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
        blockquote: editor.isActive("blockquote"),
      };
    },
  });

  if (!editor) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Loading editor...
      </div>
    );
  }

  const buttonClass = (isActive = false) =>
    `rounded-md border px-3 py-2 text-sm transition ${
      isActive
        ? "border-slate-900 bg-slate-900 text-white"
        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-3">
        <button
          type="button"
          className={buttonClass(active?.bold)}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </button>

        <button
          type="button"
          className={buttonClass(active?.italic)}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </button>

        <button
          type="button"
          className={buttonClass(active?.strike)}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <s>S</s>
        </button>

        <button
          type="button"
          className={buttonClass(active?.h2)}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        <button
          type="button"
          className={buttonClass(active?.h3)}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>

        <button
          type="button"
          className={buttonClass(active?.bulletList)}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          • List
        </button>

        <button
          type="button"
          className={buttonClass(active?.orderedList)}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          1. List
        </button>

        <button
          type="button"
          className={buttonClass(active?.blockquote)}
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          Quote
        </button>

        <button
          type="button"
          className={buttonClass()}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Clear format
        </button>
      </div>

      {/* Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;