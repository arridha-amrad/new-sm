import { FC, Fragment } from "react";
import Accordion from "react-bootstrap/esm/Accordion";
import { useAppDispatch } from "../../app/hooks";
import { IComment } from "./interface";
import CommentCard from "../../components/CommentCard";

interface Props {
  comments: IComment[];
  postIndex: number;
}

const Comments: FC<Props> = ({ comments, postIndex }) => {
  const sumComments = () => {
    let repliesLength = 0;
    const commentLength = comments.length;
    comments.forEach((comment) => (repliesLength += comment.replies.length));
    return commentLength + repliesLength;
  };
  return (
    <>
      {comments.length > 0 && (
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{sumComments()} comments</Accordion.Header>
            <Accordion.Body>
              {comments.map((comment, index) => {
                return (
                  <Fragment key={comment._id}>
                    <CommentCard
                      comment={comment}
                      commentIndex={index}
                      postIndex={postIndex}
                    />
                  </Fragment>
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
