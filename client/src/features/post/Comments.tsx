import { FC } from "react";
import { Comment } from "./interface";

interface Props {
  comments: Comment[];
}

const Comments: FC<Props> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <div key={comment._id}>
            <div className="d-flex align-items-center gap-3">
              <img
                src={comment.owner.avatarURL}
                className=" img-thumbnail"
                style={{ width: "50px", height: "50px" }}
                alt="avatar"
              />
              <div className="d-flex flex-column">
                <div>{comment.owner.username}</div>
                <div>{comment.createdAt}</div>
              </div>
            </div>
            <div>{comment.body}</div>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
