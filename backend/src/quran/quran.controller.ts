import { Controller, Get } from '@nestjs/common';
import { QuranService } from './quran.service';
import chapters from '../datasets/chapters.json';

@Controller('api/quran')
export class QuranController {
  constructor(private readonly quranService: QuranService) {}

  @Get('all-chapters')
  getChapters() {
    return chapters;
  }
}
