import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile } from 'fs/promises';
import path from 'path';
import { DetailedChapter, Verse } from 'src/interfaces';
import sanitizeHtml from 'sanitize-html';
import { InjectModel } from '@nestjs/mongoose';
import { QuranNote, QuranNoteDocument } from 'src/schemas/QuranNote';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User';

@Injectable()
export class QuranService {
  constructor(
    @InjectModel(QuranNote.name)
    private QuranNoteModel: Model<QuranNoteDocument>,

    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,
  ) {}

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

  async addNote(
    chapterNumber: number,
    verseNumber: number,
    note: string,
  ): Promise<void> {
    const uid = '693e0b38c2e46c6966303aae';
    const sanitizedNoteContent = sanitizeHtml(note, {
      allowedTags: [
        'p',
        'b',
        'i',
        'em',
        'strong',
        'u',
        'ul',
        'ol',
        'li',
        'br',
        'blockquote',
      ],
      allowedAttributes: {},
    });

    const newNote = new this.QuranNoteModel({
      uid,
      chapter: chapterNumber,
      verse: verseNumber,
      content: sanitizedNoteContent,
      note: sanitizedNoteContent,
      tag: '', // TODO : Add tag handling
    });

    await newNote.save();

    await this.UserModel.findByIdAndUpdate(uid, {
      $push: { notes: newNote._id },
      createdTags: [], // TODO : Add tag handling
    });
  }
}
