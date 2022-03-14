import { FC, useRef } from "react";
import Carousel from "react-bootstrap/esm/Carousel";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CommentIcon from "../../components/CommentIcon";
import { selectUserState } from "../authentication/authSlice";
import CommentMaker from "../comment/CreateCommentFeature";
import Comments from "../comment/Comments";
import DeletePostButton from "./DeletePostFeature";
import { Post } from "./interface";
import LikePostButton from "./LikePostFeature";
import { toggleIsEdit, unsetIsEdit } from "./postSlice";
import UpdatePostForm from "./UpdatePostFeature";
import { timeSetter } from "../../utils/timeSetter";
import { setLikes } from "../../utils/likeHelpers";

interface Props {
  post: Post;
  stateIndex: number;
}

const PostCard: FC<Props> = ({ post, stateIndex }) => {
  const ref = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const { loginUser } = useAppSelector(selectUserState);

  const setEdit = () => {
    dispatch(toggleIsEdit(stateIndex));
  };

  const hideFormEditPost = () => {
    dispatch(unsetIsEdit(stateIndex));
  };

  return (
    <div className="row justify-content-center mb-4">
      <div className="col-12 col-lg-8 rounded border p-3">
        <div className="d-flex gap-4 align-items-center mb-2">
          <img
            style={{ width: "50px", height: "50px" }}
            className="img-thumbnail rounded-circle"
            src={post.owner.avatarURL}
            alt="avatar"
          />
          <div className="d-flex flex-column flex-grow-1">
            <div>{post.owner.username}</div>
            <small className=" text-black-50">
              {timeSetter(new Date(post.createdAt))}
            </small>
          </div>

          <div>
            {post.owner._id === loginUser?._id && (
              <Dropdown className="d-inline mx-2" autoClose="inside">
                <Dropdown.Toggle
                  className="bg-secondary rounded-circle"
                  id="dropdown-autoclose-outside"
                />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={setEdit}>Update Post</Dropdown.Item>
                  <DeletePostButton post={post} />
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>

        {post.images.length > 0 && (
          <div className="overflow-hidden d-flex justify-content-center bg-black bg-opacity-10">
            <Carousel interval={null}>
              {post.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className=" img-fluid rounded"
                    style={{
                      width: "auto",
                      height: "100%",
                      maxHeight: "700px",
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

        <div className="my-3 d-flex align-items-start">
          <div className="flex-grow-1" style={{ whiteSpace: "pre" }}>
            {post.isEdit ? (
              <UpdatePostForm post={post} hideFormEditPost={hideFormEditPost} />
            ) : (
              post.body
            )}
          </div>
        </div>

        <div className="d-flex my-2 align-items-center">
          {post.likes.length > 0 && <span>{post.likes.length}</span>}
          <LikePostButton post={post} stateIndex={stateIndex} />
          <button
            onClick={() => ref.current?.focus()}
            className="btn bg-transparent border-0"
          >
            <CommentIcon />
          </button>
        </div>

        {post.likes.length > 0 && (
          <div className="mb-3">Like by {setLikes(post.likes, loginUser!)}</div>
        )}

        <div>
          <Comments comments={post.comments} postIndex={stateIndex} />
        </div>
        <CommentMaker post={post} ref={ref} />
      </div>
    </div>
  );
};

export default PostCard;
