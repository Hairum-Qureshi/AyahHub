import heroImage from "../../assets/HeroImage.jpg";
import useQuran from "../../hooks/useQuran";
import ChapterDiv from "../ChapterDiv";

export default function Landing() {
	const { allQuranicChaptersData } = useQuran();

	return (
		<div className="relative w-full bg-gray-700 min-h-screen max-h-scroll-y">
			<div className="relative w-full h-96">
				<img
					src={heroImage}
					alt="Quran Banner"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 flex flex-col">
					<div className="-ml-4 w-1/2 text-center mt-55">
						<h1 className="text-yellow-300 text-4xl">Welcome to the Quran</h1>
						<button className="mt-4 bg-amber-400 p-2 w-1/2 rounded-md text-xl font-semibold text-black hover:cursor-pointer">
							Explore the Quran
						</button>
					</div>
				</div>
			</div>
			<div className="text-white p-8">
				<h1 className="text-5xl font-light text-white mb-10 text-center">
					Chapters of the Quran
				</h1>
				<div>
					<div className="lg:grid lg:grid-cols-3 lg:grid-rows-5 lg:gap-4">
						{allQuranicChaptersData?.map((chapter, index) => (
							<ChapterDiv
								key={index}
								chapter={chapter}
								chapterNumber={index + 1}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
