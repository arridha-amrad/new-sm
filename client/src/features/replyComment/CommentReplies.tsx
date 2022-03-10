import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { timeSetter } from "../../utils/timeSetter";
import { selectUserState } from "../authentication/authSlice";
import DeleteReplyButton from "./DeleteReplyButton";
import { ReplyComment } from "./interface";

interface Props {
  postIndex: number;
  commentIndex: number;
  replies: ReplyComment[];
}

const CommentReplies: FC<Props> = ({ replies, postIndex, commentIndex }) => {
  const { loginUser } = useAppSelector(selectUserState);
  return (
    <div className="mt-2">
      {replies.map((reply, index) => (
        <div
          key={index}
          className="d-flex gap-3 align-items-start border rounded p-2 mb-1"
        >
          <div>
            <img
              src={reply.sender.avatarURL}
              className=" rounded-circle"
              style={{ width: "30px", height: "30px" }}
              alt="avatar"
            />
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex gap-2 align-items-center">
              <small>{reply.sender.username}</small>
              <small className=" text-muted">
                {timeSetter(new Date(reply.createdAt))}
              </small>

              {reply.sender._id === loginUser?._id && (
                <DeleteReplyButton
                  commentIndex={commentIndex}
                  postIndex={postIndex}
                  reply={reply}
                />
              )}
            </div>
            <small>{reply.body}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentReplies;
