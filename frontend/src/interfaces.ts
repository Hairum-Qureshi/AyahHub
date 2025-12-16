interface Chapter {
	surahName: string;
	surahNameArabic: string;
	surahNameArabicLong: string;
	surahNameTranslation: string;
	revelationPlace: string;
	totalAyah: number;
}

interface Verse {
	id: number;
	text: string;
	translation: string;
	transliteration: string;
}

interface DetailedChapter {
	id: number;
	name: string;
	transliteration: string;
	translation: string;
	type: "meccan" | "medinan";
	total_verses: number;
	verses: Array<Verse>;
}

interface UseQuranHookData {
	allQuranicChaptersData: Chapter[];
	chapterData: DetailedChapter | undefined;
}

export type { UseQuranHookData, Chapter, DetailedChapter };
