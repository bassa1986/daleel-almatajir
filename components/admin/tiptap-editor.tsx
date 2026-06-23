'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  ImageIcon,
  Quote,
  List,
  ListOrdered,
} from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        dir: 'rtl',
        class:
          'prose prose-invert prose-slate max-w-none min-h-[420px] focus:outline-none ' +
          'prose-headings:font-extrabold prose-headings:text-white prose-p:text-slate-300 ' +
          'prose-a:text-primary prose-strong:text-white prose-li:text-slate-300 px-5 py-4',
      },
    },
  });

  if (!editor) return null;

  function addLink() {
    const url = window.prompt('أدخل الرابط:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  }

  function addImage() {
    const url = window.prompt('أدخل رابط الصورة:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div className="glass overflow-hidden" dir="rtl">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-white/8 flex-wrap">
        <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={15} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 size={15} />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={15} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton active={editor.isActive('link')} onClick={addLink}>
          <LinkIcon size={15} />
        </ToolbarButton>
        <ToolbarButton active={false} onClick={addImage}>
          <ImageIcon size={15} />
        </ToolbarButton>
        <Divider />
        <ToolbarButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={15} />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={15} />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
        active ? 'bg-primary/20 text-blue-300' : 'text-slate-400 hover:bg-white/8 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-white/10 mx-1" />;
}
