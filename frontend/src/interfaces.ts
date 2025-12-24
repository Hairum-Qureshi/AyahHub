import type { Editor } from "@tiptap/react";

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

interface ToolbarProps {
	showNoteEditor: (show: boolean) => void;
	editor: Editor;
	chapterNumber: string;
	verseNumber: string;
}

interface NotesContainerProps {
	showNoteEditor: boolean;
	handleToggleNoteEditor: (show: boolean) => void;
	chapterNumber: string;
	verseNumber: string;
}

export type {
	UseQuranHookData,
	Chapter,
	DetailedChapter,
	VerseBlockProps,
	ToolbarProps,
	NotesContainerProps
};
