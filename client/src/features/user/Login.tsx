import { FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import InputPassword from "../../components/InputPassword";
import useForm from "../../utils/useForm";
import { LoginDTO } from "./interface";
import { loginAction, selectUserState } from "./userSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoading, loginUser } = useAppSelector(selectUserState);
  const navigate = useNavigate();

  const { onChange, state } = useForm<LoginDTO>({
    identity: "",
    password: "",
  });

  const { pathname } = useLocation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginAction(state));
    if (result.meta.requestStatus === "fulfilled") {
      localStorage.setItem("isAuthenticated", "true");
      if (pathname === "/login") {
        navigate("/");
      } else {
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    if (loginUser) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [loginUser]);

  return (
    <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
      <input
        value={state.identity}
        name="identity"
        onChange={onChange}
        className="form-control"
        placeholder="identity"
        type="text"
      />
      <InputPassword value={state.password} onChange={onChange} />
      <button disabled={isLoading} type="submit" className="btn btn-primary">
        {isLoading ? "loading..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
