import { FC } from "react";
import Accordion from "react-bootstrap/esm/Accordion";
import DeleteCommentButton from "../comment/DeleteCommentButton";
import { Comment } from "../comment/interface";

interface Props {
  comments: Comment[];
}

const Comments: FC<Props> = ({ comments }) => {
  return (
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{comments.length} comments</Accordion.Header>
        <Accordion.Body>
          {comments.map((comment) => {
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
                  <small className="text-black-50">{comment.createdAt}</small>
                  <div>{comment.body}</div>
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
  );
};

export default Comments;
