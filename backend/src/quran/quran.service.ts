import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile } from 'fs/promises';
import path from 'path';

@Injectable()
export class QuranService {
  constructor() {}

  async getChapter(chapterNumber: number, lang: 'en' | 'ur') {
    const filePath = path.join(
      process.cwd(),
      'src',
      'quran',
      'datasets',
      'chapters',
      lang === 'en' ? 'en' : 'ur',
      `${chapterNumber}.json`,
    );

    try {
      const data = await readFile(filePath, 'utf-8');
      return data;
    } catch {
      throw new NotFoundException(`Surah ${chapterNumber} not found`);
    }
  }
}
