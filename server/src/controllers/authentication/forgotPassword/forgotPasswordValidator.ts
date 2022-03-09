import {
  IFieldError,
  IValidationResult,
} from '../../../interfacesAndTypes/AuthValidatorInterfaces';

export default (email: string): IValidationResult => {
  let errors: IFieldError[] = [];
  if (email.trim() === '') {
    errors = [
      ...errors,
      {
        field: 'email',
        message: 'email is required',
      },
    ];
  }
  return {
    errors,
    valid: errors.length <= 0,
  };
};
