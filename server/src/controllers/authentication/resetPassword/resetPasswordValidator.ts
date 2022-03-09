import {
  IFieldError,
  IValidationResult,
} from '../../../interfacesAndTypes/AuthValidatorInterfaces';

export default (password: string): IValidationResult => {
  let errors: IFieldError[] = [];
  if (password.length === 0) {
    errors = [
      ...errors,
      {
        field: 'password',
        message: 'please input a valid password',
      },
    ];
  }
  return {
    errors,
    valid: errors.length <= 0,
  };
};
