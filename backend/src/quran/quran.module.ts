import { Module } from '@nestjs/common';
import { QuranService } from './quran.service';
import { QuranController } from './quran.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuranNote, QuranNoteSchema } from 'src/schemas/QuranNote';
import { User, UserSchema } from 'src/schemas/User';

@Module({
  providers: [QuranService],
  controllers: [QuranController],
  imports: [
    MongooseModule.forFeature([
      {
        name: QuranNote.name,
        schema: QuranNoteSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class QuranModule {}
