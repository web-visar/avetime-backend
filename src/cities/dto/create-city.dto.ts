import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  countryCode: string; // ISO 3166-1 alpha-2 code

  @IsUUID('4')
  cityId: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
