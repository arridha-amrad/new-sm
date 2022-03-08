import { ChangeEvent, FormEvent, useState } from "react";
import { Alert } from "../features/alert/interface";

interface FieldValidator<T> {
  errors: Partial<T>;
  isValid: boolean;
}

const useFormHooks = <T>(
  initialState: T,
  submitAction: () => Promise<void>,
  fieldValidator: () => FieldValidator<T>
) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<T> | null>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFieldErrors(null);
    const { errors, isValid } = fieldValidator();
    if (isValid) {
      setLoading(true);
      await submitAction();
      setLoading(false);
    } else {
      setFieldErrors(errors);
    }
  };

  return {
    state,
    onChange,
    setState,
    onSubmit,
    loading,
    setLoading,
    alert,
    setAlert,
    fieldErrors,
  };
};

export default useFormHooks;
