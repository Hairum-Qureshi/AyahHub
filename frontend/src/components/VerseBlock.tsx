import { useParams } from "react-router-dom";
import type { VerseBlockProps } from "../interfaces";

export default function VerseBlock({
	verse,
	verseNumber,
	transliteration,
	translation
}: VerseBlockProps) {
	function toArabicNumerals(num) {
		const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
		return num.toString().replace(/\d/g, d => arabicNumbers[d]);
	}

	const { chapterNumber } = useParams();

	return (
		<div className="p-4 border border-yellow-500 rounded-md bg-[#041C2E]">
			<div className="m-5">
				<h3 className="text-right text-3xl font-secondary leading-15">
					{verse}{" "}
					<span className="text-yellow-500">
						۝<span className="">{toArabicNumerals(verseNumber)}</span>
					</span>
				</h3>
				<div className="mt-5">
					<p className="text-left mt-2 text-lg text-yellow-500">
						{transliteration}
					</p>
					<p className="text-left mt-2 text-lg">
						{translation}.{" "}
						<span className="text-yellow-500">
							<span>
								({chapterNumber}:{verseNumber})
							</span>
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}
