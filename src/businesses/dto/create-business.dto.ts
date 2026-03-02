import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateBusinessDto {
	@IsString()
	@MinLength(3)
	@MaxLength(200)
	name: string;

	@IsString()
	@MinLength(3)
	@MaxLength(100)
	link: string;

	@IsString()
	@MinLength(5)
	@MaxLength(255)
	address: string;

	@IsUUID()
	cityGroupId: string;
}
