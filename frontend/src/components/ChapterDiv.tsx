import { Link } from "react-router-dom";
import type { Chapter } from "../interfaces";

interface ChapterDivProps {
	chapter: Chapter;
	chapterNumber: number;
}

export default function ChapterDiv({
	chapter,
	chapterNumber
}: ChapterDivProps) {
	return (
		<Link to={`/quran/chapter/${chapterNumber}`}>
			<div className="bg-slate-800 p-1 rounded-md border border-sky-400 flex items-center my-4 lg:my-0">
				<div className="w-13 h-13 border-2 border-sky-400 rounded-md rotate-120 m-5 flex items-center justify-center bg-sky-800">
					<h1 className="-rotate-120 text-2xl">{chapterNumber}</h1>
				</div>
				<div className="mx-5 flex flex-col">
					<h2 className="text-xl font-bold">{chapter.surahName}</h2>
					<h3 className="text-md italic">{chapter.surahNameArabic}</h3>
					<p className="text-sm">
						{chapter.surahNameTranslation} - {chapter.totalAyah} Verses
					</p>
				</div>
			</div>
		</Link>
	);
}
