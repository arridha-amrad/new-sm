import { RegisterRequest } from '../../../dto/AuthData';
import {
  IFieldError,
  IValidationResult,
} from '../../../interfacesAndTypes/AuthValidatorInterfaces';

export default (data: RegisterRequest): IValidationResult => {
  const { email, password, username } = data;
  const regEx =
    /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  let errors: IFieldError[] = [];
  if (username.trim() === '') {
    errors = [
      ...errors,
      {
        field: 'username',
        message: 'username is required',
      },
    ];
    // errors.username = 'Username is required';
  } else if (username.length <= 5) {
    errors = [
      ...errors,
      {
        field: 'username',
        message: 'username is too short',
      },
    ];
  } else if (username.includes(' ')) {
    errors = [
      ...errors,
      {
        field: 'username',
        message: "username can't contain space",
      },
    ];
  }
  if (email.trim() === '') {
    errors = [
      ...errors,
      {
        field: 'email',
        message: 'email is required',
      },
    ];
  } else if (!email.match(regEx)) {
    errors = [
      ...errors,
      {
        field: 'email',
        message: 'email is not valid',
      },
    ];
  }

  if (password?.length === 0) {
    errors = [
      ...errors,
      {
        field: 'password',
        message: 'Password is required',
      },
    ];
  }
  return {
    errors,
    valid: errors.length <= 0,
  };
};
