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
			<div className="bg-slate-800 rounded-md border border-sky-400 flex items-center lg:my-0 my-5 shadow-[0_0_8px_rgba(56,189,248,0.7)]">
				<div className="w-13 h-13 border-2 border-sky-400 rounded-md rotate-120 flex items-center justify-center bg-sky-800 m-5">
					<h1 className="-rotate-120 text-2xl">{chapterNumber}</h1>
				</div>
				<div className="mx-5 flex flex-col">
					<h2 className="text-xl font-bold">{chapter.surahName}</h2>
					<h3 className="text-3xl font-secondary">{chapter.surahNameArabic}</h3>
				</div>
				<div className="ml-auto text-center border-l border-sky-400 w-20 self-stretch px-4 py-2 flex flex-col justify-center items-center bg-sky-950 rounded-br-md rounded-tr-md">
					<h1 className="text-2xl font-semibold">{chapter.totalAyah}</h1>
					<p>Verses</p>
				</div>
			</div>
		</Link>
	);
}
