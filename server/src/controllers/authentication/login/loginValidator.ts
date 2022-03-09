import { LoginRequest } from '../../../dto/AuthData';
import {
  IFieldError,
  IValidationResult,
} from '../../../interfacesAndTypes/AuthValidatorInterfaces';

export default ({ identity, password }: LoginRequest): IValidationResult => {
  let errors: IFieldError[] = [];
  if (identity.trim() === '') {
    errors = [
      ...errors,
      {
        field: 'identity',
        message: 'please input your email or username',
      },
    ];
  }
  if (password?.length === 0) {
    errors = [
      ...errors,
      {
        field: 'password',
        message: 'password is required',
      },
    ];
  }
  return {
    errors,
    valid: errors.length <= 0,
  };
};
