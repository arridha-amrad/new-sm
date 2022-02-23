import { useAppSelector } from "../app/hooks";
import { selectUserState } from "../features/user/userSlice";

const HomeProfile = () => {
  const { loginUser } = useAppSelector(selectUserState);
  return (
    <div className="w-25">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div>
          <img
            style={{
              height: "100px",
              width: "100px",
              borderRadius: "50%",
            }}
            className="img-thumbnail"
            src={loginUser?.avatarURL}
            alt="avatar"
          />
        </div>
        <p>{loginUser?.username}</p>
        <p>{loginUser?.email}</p>
      </div>
    </div>
  );
};

export default HomeProfile;