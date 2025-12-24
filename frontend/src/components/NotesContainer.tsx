import Toolbar from "./Toolbar";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extensions";
import "../css/index.css";
import type { NotesContainerProps } from "../interfaces";

export default function NotesContainer({
	showNoteEditor,
	handleToggleNoteEditor,
	chapterNumber,
	verseNumber
}: NotesContainerProps) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Placeholder.configure({
				placeholder: "Write your note/reflection here..."
			})
		],
		editorProps: {
			attributes: {
				class: "focus:outline-none"
			}
		}
	});

	if (!editor) return null;

	return showNoteEditor ? (
		<div className="border-t border-yellow-500 mt-4 bg-[#08151f] rounded-br-md rounded-bl-md">
			<Toolbar showNoteEditor={handleToggleNoteEditor} editor={editor} chapterNumber={chapterNumber} verseNumber={verseNumber} />
			<EditorContent
				editor={editor}
				className="w-full h-40 text-white p-3 outline-none
    [&_.ProseMirror]:min-h-full
    [&_.ProseMirror]:max-h-full
    [&_.ProseMirror]:overflow-y-auto
    [&_.ProseMirror]:cursor-text
    [&_.ProseMirror]:focus:outline-none
    [&_p]:mb-2
    [&_blockquote]:pl-4 [&_blockquote]:border-l-4 [&_blockquote]:border-sky-500 [&_blockquote]:italic [&_blockquote]:text-slate-400
    [&_ul]:list-disc [&_ul]:pl-6
    [&_ol]:list-decimal [&_ol]:pl-6
    [&_li]:mb-1"
			/>
		</div>
	) : null;
}
