import { IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class UpdateMembershipDto {
  @IsUUID()
  @IsOptional()
  role?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
