import { Container } from "react-bootstrap";
import Navbar from "../components/AppBar";
import HomeProfile from "../components/HomeProfile";
import HomePosts from "../components/HomePosts";
import PostMaker from "../features/post/CreatePostFeature";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          closeButton={false}
          icon={false}
          theme="colored"
        />
      </Container>
    </>
  );
};

export default Home;
