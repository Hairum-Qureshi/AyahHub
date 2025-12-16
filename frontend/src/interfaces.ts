interface Chapter {
	surahName: string;
	surahNameArabic: string;
	surahNameArabicLong: string;
	surahNameTranslation: string;
	revelationPlace: string;
	totalAyah: number;
}

interface UseQuranHookData {
	allQuranicChaptersData: Chapter[];
}

export type { UseQuranHookData, Chapter };
