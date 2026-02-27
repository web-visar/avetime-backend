import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTimezoneDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  tzCode: string; // IANA timezone identifier

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  name: string; // Translated display name

  @IsString()
  @IsNotEmpty()
  @Length(2, 5)
  lang: string; // ISO 639-1 language code

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  countryCode: string; // ISO 3166-1 alpha-2 code
}
