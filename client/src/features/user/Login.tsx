import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import InputPassword from "../../components/InputPassword";
import MyAlert from "../../components/MyAlert";
import useFormHooks from "../../utils/useFormHooks";
import { LoginDTO } from "./interface";
import { loginAction, selectUserState } from "./userSlice";

const Login = () => {
  type LoginFieldValidator = Partial<LoginDTO>;

  const dispatch = useAppDispatch();
  const { loginUser } = useAppSelector(selectUserState);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMounted, setIsMounted] = useState(true);

  const checkField = () => {
    let errors: LoginFieldValidator = {};
    if (state.identity.trim() === "") {
      errors.identity = "Identity field is required";
    }
    if (state.password.trim() === "") {
      errors.password = "Password field is required";
    }
    return {
      errors,
      isValid: Object.keys(errors).length <= 0,
    };
  };

  const login = async () => {
    try {
      const result = await dispatch(loginAction(state));
      if (result.meta.requestStatus === "fulfilled") {
        if (pathname === "/login") {
          navigate("/");
        } else {
          window.location.href = "/";
        }
      }
      if (result.meta.requestStatus === "rejected") {
        setAlert({
          type: "error",
          text: result.payload as string,
        });
      }
    } catch (err) {
      console.log("err login : ", err);
    }
  };

  const { onChange, state, alert, loading, setAlert, onSubmit, fieldErrors } =
    useFormHooks<LoginDTO>(
      {
        identity: "",
        password: "",
      },
      login,
      checkField
    );

  useEffect(() => {
    if (loginUser && isMounted) {
      navigate("/");
    }
    return () => setIsMounted(false);
    // eslint-disable-next-line
  }, [loginUser]);

  return (
    <div>
      {!!alert && <MyAlert alert={alert} close={() => setAlert(null)} />}
      <form onSubmit={onSubmit} className="d-flex flex-column gap-3">
        <div>
          <input
            value={state.identity}
            name="identity"
            onChange={onChange}
            className="form-control"
            placeholder="identity"
            type="text"
          />
          {fieldErrors?.identity && (
            <small className="text-danger">{fieldErrors.identity}</small>
          )}
        </div>
        <InputPassword
          fieldError={fieldErrors?.password}
          value={state.password}
          onChange={onChange}
        />
        <button disabled={loading} type="submit" className="btn btn-primary">
          {loading ? "loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
