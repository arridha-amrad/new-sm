import { FC, useRef } from "react";
import Accordion from "react-bootstrap/esm/Accordion";
import { useAppDispatch } from "../../app/hooks";
import { timeSetter } from "../../utils/timeSetter";
import { setShowReplyCommentInput } from "../post/postSlice";
import CommentReplies from "./CommentReplies";
import DeleteCommentButton from "./DeleteCommentButton";
import { Comment } from "./interface";
import LikeCommentButton from "./LikeCommentButton";
import ReplyComment from "./ReplyCommentForm";

interface Props {
  comments: Comment[];
  postIndex: number;
}

const Comments: FC<Props> = ({ comments, postIndex }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const showReplyCommentForm = (comment: Comment) => {
    dispatch(setShowReplyCommentInput(comment));
  };
  return (
    <>
      {comments.length > 0 && (
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{comments.length} comments</Accordion.Header>
            <Accordion.Body>
              {comments.map((comment, index) => {
                return (
                  <div
                    className="d-flex gap-3 border rounded-3 p-2 mb-2"
                    key={comment._id}
                  >
                    <img
                      src={comment.owner.avatarURL}
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                      alt="avatar"
                    />

                    <div className="d-flex flex-column flex-grow-1">
                      <div>{comment.owner.username}</div>
                      <small className="text-black-50">
                        {timeSetter(new Date(comment.createdAt))}
                      </small>
                      <div>{comment.body}</div>
                      <div className="d-flex gap-2">
                        <LikeCommentButton comment={comment} />
                        <button
                          onClick={() => {
                            showReplyCommentForm(comment);
                            ref.current?.focus();
                          }}
                          className="btn btn-sm"
                        >
                          reply
                        </button>
                      </div>

                      <ReplyComment
                        postIndex={postIndex}
                        stateIndex={index}
                        comment={comment}
                      />

                      {comment.replies && (
                        <CommentReplies replies={comment.replies} />
                      )}
                    </div>

                    <div>
                      <DeleteCommentButton comment={comment} />
                    </div>
                  </div>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
};

export default Comments;
