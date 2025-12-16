import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile } from 'fs/promises';
import path from 'path';

@Injectable()
export class QuranService {
  constructor() {}

  private async getJSONData(
    filePath: string,
    chapterNumber: number,
    lang?: 'en' | 'ur',
  ) {
    const joinedFilePath = path.join(
      process.cwd(),
      filePath,
      lang ? lang : '',
      `${chapterNumber}.json`,
    );
    return await readFile(joinedFilePath, 'utf-8');
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
}
