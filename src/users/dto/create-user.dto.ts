import { Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: i18nValidationMessage('validation.INVALID_EMAIL'),
  })
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: i18nValidationMessage('validation.PASSWORD_REQUIREMENTS'),
  })
  password: string;

  @Matches(/^[a-zA-Z\s'-]{2,}$/, {
    message: i18nValidationMessage('validation.INVALID_FULL_NAME'),
  })
  fullName: string;
}
