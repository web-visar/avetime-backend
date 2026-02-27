import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  code: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 5)
  lang: string; // ISO 639-1 language code (e.g., 'en', 'fr', 'de', 'sq')

  @IsString()
  @IsOptional()
  @Length(1, 100)
  nativeName?: string;

  @IsString()
  @IsOptional()
  @Length(1, 10)
  phoneCode?: string;

  @IsString()
  @IsOptional()
  @Length(1, 10)
  flag?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
