import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/AppBar";
import HomeProfile from "../components/HomeProfile";
import { selectUserState } from "../features/user/userSlice";
import HomePosts from "../components/HomePosts";
import PostMaker from "../features/post/PostMaker";

const Home = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div className="row align-items-center">
          <div className="col-lg-8 col-12">
            <PostMaker />
          </div>
          <div className="col-lg-4 d-lg-block d-none">
            <HomeProfile />
          </div>
        </div>
        <div className="mt-5">
          <HomePosts />
        </div>
      </Container>
    </>
  );
};

export default Home;
