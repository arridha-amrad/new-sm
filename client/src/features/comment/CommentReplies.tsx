import { FC } from "react";
import { timeSetter } from "../../utils/timeSetter";
import { CommentReply } from "./interface";

interface Props {
  replies: CommentReply[];
}

const CommentReplies: FC<Props> = ({ replies }) => {
  return (
    <>
      {replies.map((reply, index) => (
        <div
          key={index}
          className="d-flex gap-3 align-items-start border rounded"
        >
          <div>
            <img
              src={reply.owner.avatarURL}
              className="img-thumbnail rounded-circle"
              style={{ width: "30px", height: "30px" }}
              alt="avatar"
            />
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex gap-2">
              <div>{reply.owner.username}</div>
              <div>{timeSetter(new Date(reply.createdAt))}</div>
            </div>
            <div>{reply.body}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentReplies;
