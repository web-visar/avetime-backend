import { IsNotEmpty, IsOptional, IsUUID, IsBoolean, IsEnum } from 'class-validator';

export class CreateMembershipDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  businessId: string;

  @IsNotEmpty()
  @IsEnum(['superadmin', 'admin', 'user', 'customer'])
  role: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
