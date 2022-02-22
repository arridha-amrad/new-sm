import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/AppBar";
import PostMaker from "../features/post/postMaker";
import { selectUserState } from "../features/user/userSlice";
import useForm from "../utils/useForm";
import Login from "./Login";

const Home = () => {
  const { loginUser } = useAppSelector(selectUserState);

  return (
    <>
      <Navbar />
      <Container>
        <div className="d-flex flex-grow-1 align-items-center gap-5 mt-3">
          <PostMaker />
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
        </div>
      </Container>
    </>
  );
};

export default Home;
