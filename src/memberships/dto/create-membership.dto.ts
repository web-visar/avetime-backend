import { IsNotEmpty, IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class CreateMembershipDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  businessId: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
