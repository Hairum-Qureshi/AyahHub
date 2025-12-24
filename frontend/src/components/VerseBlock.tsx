import { useParams } from "react-router-dom";
import type { VerseBlockProps } from "../interfaces";
import NotesContainer from "./NotesContainer";
import { useState } from "react";

export default function VerseBlock({
	verse,
	verseNumber,
	transliteration,
	translation
}: VerseBlockProps) {
	function toArabicNumerals(num: number) {
		const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
		return num
			.toString()
			.replace(/\d/g, d => arabicNumbers[d as unknown as number]);
	}

	const { chapterNumber } = useParams();

	const [showNoteEditor, setShowNoteEditor] = useState(false);

	const handleToggleNoteEditor = (show: boolean) => {
		setShowNoteEditor(show);
	};

	// TODO - add styling to buttons in WYSIWYG editor to show which buttons are selected

	return (
		<div className="border border-yellow-500 rounded-md bg-[#041C2E]">
			<div className="p-4 flex flex-row">
				<div className="flex-1 m-5">
					<h3 className="text-right text-3xl font-secondary leading-15">
						{verse}{" "}
						<span className="text-yellow-500">
							۝<span>{toArabicNumerals(verseNumber)}</span>
						</span>
					</h3>
					<div className="mt-5">
						<p className="text-left mt-2 text-lg text-yellow-500">
							{transliteration}
						</p>
						<p className="text-left mt-2 text-lg">
							{translation}.{" "}
							<span className="text-yellow-500">
								({chapterNumber}:{verseNumber})
							</span>
						</p>
					</div>
				</div>
				<div className="border rounded-md w-10 bg-slate-800 border-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.7)]">
					<button
						className="text-white"
						onClick={() => handleToggleNoteEditor(!showNoteEditor)}
					>
						{showNoteEditor ? "Hide" : "Show"}
					</button>
				</div>
			</div>
			<NotesContainer
				showNoteEditor={showNoteEditor}
				handleToggleNoteEditor={handleToggleNoteEditor}
				chapterNumber={chapterNumber as string}
				verseNumber={verseNumber as unknown as string}
			/>
		</div>
	);
}
