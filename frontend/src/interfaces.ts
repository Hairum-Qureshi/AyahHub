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

interface VerseBlockProps {
	verse: string;
	verseNumber: number;
	transliteration: string;
	translation: string;
}

export type { UseQuranHookData, Chapter, DetailedChapter, VerseBlockProps };
