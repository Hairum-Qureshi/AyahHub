import { HiMiniBold } from "react-icons/hi2";
import { FaItalic } from "react-icons/fa";
import { ImUnderline } from "react-icons/im";
import { BiSolidQuoteAltRight } from "react-icons/bi";
import { MdFormatListBulleted } from "react-icons/md";
import { HiNumberedList } from "react-icons/hi2";
import { Editor } from "@tiptap/react";

interface ToolbarProps {
	showNoteEditor: (show: boolean) => void;
	editor: Editor;
}

export default function Toolbar({ showNoteEditor, editor }: ToolbarProps) {
	return (
		<div className="mr-auto p-2 flex space-x-4 items-center bg-[#012a44] border-b border-yellow-500">
			<div className="mx-3 flex space-x-4">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					title="Bold"
				>
					<HiMiniBold className="text-white hover:cursor-pointer" size={20} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					title="Italic"
				>
					<FaItalic className="text-white hover:cursor-pointer" size={20} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					disabled={!editor.can().chain().focus().toggleUnderline().run()}
					title="Underline"
				>
					<ImUnderline className="text-white hover:cursor-pointer" size={20} />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					disabled={!editor.can().chain().focus().toggleBlockquote().run()}
					title="Block Quote"
				>
					<BiSolidQuoteAltRight
						className="text-white hover:cursor-pointer"
						size={25}
					/>
				</button>
				<button
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					disabled={!editor.can().chain().focus().toggleBulletList().run()}
					title="Bullet List"
				>
					<MdFormatListBulleted
						className="text-white hover:cursor-pointer"
						size={25}
					/>
				</button>
				<button
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					disabled={!editor.can().chain().focus().toggleOrderedList().run()}
					title="Numbered List"
				>
					<HiNumberedList
						className="text-white hover:cursor-pointer"
						size={25}
					/>
				</button>
			</div>
			<div className="ml-auto space-x-4 mx-3">
				<button className="bg-green-700 text-white px-4 py-1 rounded-sm hover:cursor-pointer">
					Save
				</button>
				<button
					className="text-white px-4 py-1 rounded-sm bg-red-700 hover:cursor-pointer
                "
					onClick={() => showNoteEditor(false)}
				>
					Close
				</button>
			</div>
		</div>
	);
}
