import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class NoteDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  note: string;

  @IsNotEmpty()
  @IsString()
  verse: string;

  @IsNotEmpty()
  @IsString()
  chapter: string;
}
