import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import GoogleLogin from "../components/GoogleLogin";
import MyAlert from "../components/MyAlert";
import RegisterForm from "../features/user/Register";
import { selectUserState, unsetAlert } from "../features/user/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { alert } = useAppSelector(selectUserState);
  return (
    <section className="d-flex flex-column min-vh-100 overflow-hidden">
      <div className="flex-grow-1 d-flex align-items-center  justify-content-center">
        <div
          style={{ width: "400px" }}
          className="d-flex flex-column gap-3 mx-1 p-4 shadow-sm border rounded"
        >
          <h1 className="fw-bold">Register</h1>

          <MyAlert alert={alert} close={() => dispatch(unsetAlert())} />

          <RegisterForm />
          <small className=" text-center">
            Have an account?
            <Link className=" ms-1 text-decoration-none" to="/login">
              login
            </Link>
          </small>

          <GoogleLogin />
        </div>
      </div>

      <div className="flex-grow-0 d-flex align-items-center justify-content-center flex-column my-3">
        <p>
          Created by <span className="fw-bold">Arridha Amrad</span>
        </p>
      </div>
    </section>
  );
};

export default Register;
