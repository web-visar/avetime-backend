import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  countryCode: string; // ISO 3166-1 alpha-2 code

  @IsString()
  @IsNotEmpty()
  @Length(2, 5)
  lang: string; // ISO 639-1 language code

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
