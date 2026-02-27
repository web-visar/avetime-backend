import { IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class UpdateMembershipDto {
  @IsUUID()
  @IsOptional()
  membershipRoleId?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
