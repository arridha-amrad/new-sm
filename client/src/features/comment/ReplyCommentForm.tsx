import React, { FC, FormEvent, HTMLProps } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useForm from "../../utils/useForm";
import { setCommentReply, unsetReplyCommentForm } from "../post/postSlice";
import { selectUserState } from "../user/userSlice";
import { Comment } from "./interface";

type InputProps = HTMLProps<HTMLInputElement>;

interface Props extends InputProps {
  stateIndex: number;
  postIndex: number;
  comment: Comment;
}

const ReplyCommentForm = React.forwardRef<HTMLInputElement, Props>(
  ({ comment, stateIndex, postIndex }, ref) => {
    const dispatch = useAppDispatch();
    const { loginUser } = useAppSelector(selectUserState);

    const { onChange, setState, state } = useForm({
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

    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      const date = new Date().toLocaleDateString();
      dispatch(
        setCommentReply({
          commentIndex: stateIndex,
          postIndex: postIndex,
          reply: {
            body: state.body,
            comment,
            likes: [],
            owner: loginUser!,
            createdAt: date,
            updatedAt: date,
          },
        })
      );
    };

    return (
      <form
        className={`${comment.isShowInput ? "d-flex" : "d-none"} gap-1 mt-2`}
        onSubmit={onSubmit}
      >
        <input
          ref={ref}
          onChange={onChange}
          name="body"
          value={state.body}
          placeholder="reply..."
          className="form-control form-control-sm"
        />
        <button type="submit" className="btn btn-primary btn-sm">
          reply
        </button>
        <button onClick={hideForm} className="btn btn-secondary btn-sm">
          cancel
        </button>
      </form>
    );
  }
);

export default ReplyCommentForm;
