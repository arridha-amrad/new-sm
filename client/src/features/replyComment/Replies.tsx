import { FC, Fragment } from "react";
import ReplyCard from "../../components/ReplyCard";
import { IComment } from "../comment/interface";
import { ReplyComment } from "./interface";

interface Props {
  comment: IComment;
  postIndex: number;
  commentIndex: number;
  replies: ReplyComment[];
}

const CommentReplies: FC<Props> = ({
  replies,
  postIndex,
  commentIndex,
  comment,
}) => {
  return (
    <div className="mt-2 w-100">
      {replies.map((reply, index) => (
        <Fragment key={reply._id}>
          <ReplyCard
            replyIndex={index}
            comment={comment}
            commentIndex={commentIndex}
            postIndex={postIndex}
            reply={reply}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default CommentReplies;
