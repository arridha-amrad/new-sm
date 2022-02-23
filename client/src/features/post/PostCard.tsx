import { FC, useRef } from "react";
import Carousel from "react-bootstrap/esm/Carousel";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { useAppSelector } from "../../app/hooks";
import CommentIcon from "../../components/CommentIcon";
import { selectUserState } from "../user/userSlice";
import CommentMaker from "./CommentMaker";
import Comments from "./Comments";
import DeletePostButton from "./DeletePostButton";
import { Post } from "./interface";
import LikePostButton from "./LikePostButton";

interface Props {
  post: Post;
  stateIndex: number;
}

const PostCard: FC<Props> = ({ post, stateIndex }) => {
  const ref = useRef<HTMLInputElement>(null);

  const { loginUser } = useAppSelector(selectUserState);
  const updatePost = () => {};
  return (
    <div className="row w-75 justify-content-center mb-4">
      <div className="col-8 rounded border p-3">
        <div className="d-flex gap-4 align-items-center mb-2">
          <img
            style={{ width: "50px", height: "50px" }}
            className="img-thumbnail rounded-circle"
            src={post.owner.avatarURL}
            alt="avatar"
          />
          <div className="d-flex flex-column flex-grow-1">
            <div>{post.owner.username}</div>
            <small className=" text-black-50">{post.createdAt}</small>
          </div>

          <div>
            {post.owner._id === loginUser?._id && (
              <Dropdown className="d-inline mx-2" autoClose={false}>
                <Dropdown.Toggle
                  className="bg-secondary rounded-circle"
                  id="dropdown-autoclose-outside"
                />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={updatePost}>
                    Update Post
                  </Dropdown.Item>
                  <DeletePostButton post={post} />
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
        {post.images.length > 0 && (
          <div className="overflow-hidden">
            <Carousel interval={null}>
              {post.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className=" img-fluid rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                    }}
                    src={image}
                    alt="post"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        )}

        <div className="my-2">
          <div className=" text-body">
            <span className="fw-bold me-2">{post.owner.username}</span>
            {post.body}
          </div>
        </div>

        <div className="fs-2 mb-3 d-flex border rounded-3">
          <LikePostButton post={post} stateIndex={stateIndex} />
          <button
            onClick={() => ref.current?.focus()}
            className="btn bg-transparent border-0"
          >
            <CommentIcon />
          </button>
        </div>
        <Comments comments={post.comments} />
        <CommentMaker post={post} ref={ref} />
      </div>
    </div>
  );
};

export default PostCard;