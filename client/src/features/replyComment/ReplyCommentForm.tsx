import React, { FormEvent, HTMLProps } from "react";
import { useAppDispatch } from "../../app/hooks";
import useForm from "../../utils/useForm";
import { IComment } from "../comment/interface";
import {
  replyComment,
  replyCommentResult,
  unsetReplyCommentForm,
} from "../post/postSlice";

import { ReplyComment } from "./interface";

type InputProps = HTMLProps<HTMLInputElement>;

interface Props extends InputProps {
  stateIndex: number;
  postIndex: number;
  comment: IComment;
}

const ReplyCommentForm = React.forwardRef<HTMLInputElement, Props>(
  ({ comment, stateIndex, postIndex }, ref) => {
    const dispatch = useAppDispatch();

    const { onChange, state, setState } = useForm({
      body: `@${comment.owner.username}`,
    });

    const hideForm = () => {
      dispatch(
        unsetReplyCommentForm({
          comment: comment,
          commentIndex: stateIndex,
        })
      );
    };

    const onSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const res = await dispatch(
        replyComment({
          commentId: comment._id,
          body: state.body,
          receiver: comment.owner._id,
        })
      );
      if (res.meta.requestStatus === "fulfilled") {
        const newReply = res.payload as ReplyComment;
        dispatch(
          replyCommentResult({
            commentIndex: stateIndex,
            postIndex: postIndex,
            reply: newReply,
          })
        );
        setState({
          body: "",
        });
        hideForm();
      }
    };

    return (
      <div
        className={`${
          comment.isShowInput ? "d-flex" : "d-none"
        } gap-1 flex-grow-1 mt-2`}
      >
        <form className="d-flex gap-2 flex-grow-1" onSubmit={onSubmit}>
          <input
            ref={ref}
            onChange={onChange}
            name="body"
            value={state.body}
            placeholder="reply..."
            className="form-control form-control-sm w-100"
          />
          <button type="submit" className="btn btn-primary btn-sm">
            reply
          </button>
        </form>
        <button onClick={hideForm} className="btn btn-secondary btn-sm">
          cancel
        </button>
      </div>
    );
  }
);

export default ReplyCommentForm;
