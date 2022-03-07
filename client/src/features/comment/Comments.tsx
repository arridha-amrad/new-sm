import { FC, useRef } from "react";
import Accordion from "react-bootstrap/esm/Accordion";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { timeSetter } from "../../utils/timeSetter";
import { setShowReplyCommentInput } from "../post/postSlice";
import CommentReplies from "../replyComment/CommentReplies";
import DeleteCommentButton from "./DeleteCommentButton";
import { IComment } from "./interface";
import LikeCommentButton from "./LikeCommentButton";
import ReplyComment from "../replyComment/ReplyCommentForm";
import { selectUserState } from "../user/userSlice";

interface Props {
  comments: IComment[];
  postIndex: number;
}

const Comments: FC<Props> = ({ comments, postIndex }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const showReplyCommentForm = (comment: IComment) => {
    dispatch(setShowReplyCommentInput(comment));
  };
  const { loginUser } = useAppSelector(selectUserState);
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
                      <div className="d-flex gap-2 align-items-center">
                        {comment.likes.length > 0 && (
                          <span className=" text-black-50">
                            {comment.likes.length}
                          </span>
                        )}
                        <LikeCommentButton comment={comment} />

                        {comment.owner._id !== loginUser?._id && (
                          <div
                            onClick={() => {
                              showReplyCommentForm(comment);
                              ref.current?.focus();
                            }}
                            className="btn btn-sm"
                          >
                            reply
                          </div>
                        )}
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

                    {comment.owner.username === loginUser?.username && (
                      <div>
                        <DeleteCommentButton comment={comment} />
                      </div>
                    )}
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
