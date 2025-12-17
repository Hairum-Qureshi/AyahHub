import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile } from 'fs/promises';
import path from 'path';
import { DetailedChapter, Verse } from 'src/interfaces';

@Injectable()
export class QuranService {
  constructor() {}

  private async getJSONData(
    filePath: string,
    JSONFileName: number,
    lang?: 'en' | 'ur',
  ): Promise<DetailedChapter> {
    const joinedFilePath = path.join(
      process.cwd(),
      filePath,
      lang ? lang : '',
      `${JSONFileName}.json`,
    );

    const fileContent: string = await readFile(joinedFilePath, 'utf-8');
    return JSON.parse(fileContent) as DetailedChapter;
  }

  async getChapter(chapterNumber: number, lang: 'en' | 'ur') {
    try {
      const data = await this.getJSONData(
        'src/quran/datasets/chapters',
        chapterNumber,
        lang,
      );
      return data;
    } catch {
      throw new NotFoundException(`Surah ${chapterNumber} not found`);
    }
  }

  async getVerse(
    chapterNumber: number,
    verseNumber: number,
    lang: 'en' | 'ur',
  ): Promise<Verse> {
    let data: DetailedChapter;

    try {
      data = await this.getJSONData(
        'src/quran/datasets/chapters',
        chapterNumber,
        lang,
      );
    } catch {
      throw new NotFoundException(`Surah ${chapterNumber} not found`);
    }

    const verse = data.verses.find((v) => {
      return v.id === Number(verseNumber);
    });

    if (!verse) {
      throw new NotFoundException(
        `Verse ${verseNumber} of Surah ${chapterNumber} not found`,
      );
    }

    return verse;
  }
}
