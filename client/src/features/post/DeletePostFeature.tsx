import { FC } from "react";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { useAppDispatch } from "../../app/hooks";
import { Post } from "./interface";
import { removePost } from "./postSlice";

interface Props {
  post: Post;
}
const DeletePostButton: FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const deletePost = async () => {
    dispatch(removePost(post));
  };
  return (
    <Dropdown.Item className="bg-danger text-white" onClick={deletePost}>
      Delete Post
    </Dropdown.Item>
  );
};

export default DeletePostButton;
