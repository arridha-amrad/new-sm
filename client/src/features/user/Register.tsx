import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import InputPassword from "../../components/InputPassword";
import useForm from "../../utils/useForm";
import { RegisterDTO } from "./interface";
import { registerAction, selectUserState, unsetAlert } from "./userSlice";

const Register = () => {
  const dispatch = useAppDispatch();
  const { alert, isLoading } = useAppSelector(selectUserState);

  const { onChange, state, setState } = useForm<RegisterDTO>({
    username: "",
    password: "",
    email: "",
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await dispatch(registerAction(state));
    console.log("res : ", res);
    if (res.meta.requestStatus === "fulfilled") {
      setState({
        ...state,
        email: "",
        password: "",
        username: "",
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
      <input
        value={state.email}
        name="email"
        onChange={onChange}
        className="form-control"
        placeholder="email"
        type="email"
      />

      <input
        value={state.username}
        name="username"
        onChange={onChange}
        className="form-control"
        placeholder="username"
        type="text"
      />
      <InputPassword value={state.password} onChange={onChange} />

      <button disabled={isLoading} type="submit" className="btn btn-primary">
        {isLoading ? "loading..." : "register"}
      </button>
    </form>
  );
};

export default Register;
