import { useParams } from "react-router-dom";
import useQuran from "../../hooks/useQuran";
import VerseBlock from "../VerseBlock";

export default function QuranChapter() {
	const { chapterNumber } = useParams();
	const { chapterData } = useQuran(chapterNumber);

	/*
     TODO - need to include verse numbers
     TODO - need to list whether the surah has a sajda or not    
    */

	return (
		<div className="bg-[#132233] min-h-screen max-h-scroll-y text-white">
			{chapterData ? (
				<div className="p-8">
					<div className="text-center space-y-3">
						<h1 className="font-primary text-4xl">سورة {chapterData.name}</h1>
						<h1 className="text-4xl">
							{chapterData.transliteration} ({chapterData.translation})
						</h1>
						<p className="text-center mt-2 text-lg">
							Number of Verses: {chapterData.verses.length}
						</p>
					</div>
					<div className="w-3/4 m-auto">
						{chapterData.name !== "الفاتحة" &&
							chapterData.name !== "التوبة" && (
								<div className="p-4 ml-auto border my-10 border-sky-500 rounded-md bg-[#02243B]">
									<div className="m-5 text-center">
										<h3 className="text-5xl font-primary">﷽</h3>
										<div className="mt-8">
											<p className="mt-2 text-lg text-sky-400">
												Bismillah ir-Rahman ir-Rahim
											</p>
											<p className=" mt-2 text-lg">
												In the name of Allah, the Most Gracious, the Most
												Merciful.
											</p>
										</div>
									</div>
								</div>
							)}
					</div>
					<div className="w-3/4 m-auto my-6 space-y-6">
						{chapterData.verses.map((verse, index) => (
							<VerseBlock
								verse={verse.text}
                                verseNumber={index + 1}
								transliteration={verse.transliteration}
								translation={verse.translation}
							/>
						))}
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}
