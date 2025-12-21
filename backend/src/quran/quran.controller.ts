import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuranService } from './quran.service';
import chapters from './datasets/chapters.json';

@Controller('api/quran')
export class QuranController {
  constructor(private readonly quranService: QuranService) {}

  @Get('all-chapters')
  getChapters() {
    return chapters;
  }

  @Get('chapter/:chapterNumber')
  getChapterDetails(
    @Param('chapterNumber') chapterNumber: number,
    @Query('lang') lang: 'en' | 'ur' = 'en',
  ) {
    return this.quranService.getChapter(chapterNumber, lang);
  }

  @Get(':chapterNumber/:verseNumber')
  getVerseDetails(
    @Param('chapterNumber') chapterNumber: number,
    @Param('verseNumber') verseNumber: number,
    @Query('lang') lang: 'en' | 'ur' = 'en',
  ) {
    return this.quranService.getVerse(chapterNumber, verseNumber, lang);
  }

  @Post(':chapterNumber/:verseNumber/note')
  addNote(
    @Param('chapterNumber') chapterNumber: number,
    @Param('verseNumber') verseNumber: number,
    @Body('note') note: string,
  ) {
    return this.quranService.addNote(chapterNumber, verseNumber, note);
  }
}
