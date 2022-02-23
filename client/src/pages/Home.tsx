import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/AppBar";
import HomeProfile from "../components/HomeProfile";
import { selectUserState } from "../features/user/userSlice";
import HomePosts from "../components/HomePosts";
import PostMaker from "../features/post/postMaker";

const Home = () => {
  const { loginUser } = useAppSelector(selectUserState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginUser) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <div className="d-flex flex-grow-1 align-items-center gap-5 mt-3">
          <PostMaker />
          <HomeProfile />
        </div>
        <div className="mt-5">
          <HomePosts />
        </div>
      </Container>
    </>
  );
};

export default Home;
