import React, { FormEvent, HTMLProps } from "react";
import { useAppDispatch } from "../../app/hooks";
import useForm from "../../utils/useForm";
import { Post } from "./interface";
import { createCommentAction } from "./postSlice";

type InputProps = HTMLProps<HTMLInputElement>;

interface Props extends InputProps {
  post: Post;
}

const CommentMaker = React.forwardRef<HTMLInputElement, Props>(
  ({ post }, ref) => {
    const dispatch = useAppDispatch();

    const { state, onChange } = useForm({
      body: "",
    });

    const onSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const res = await dispatch(
        createCommentAction({
          data: state.body,
          postId: post._id,
        })
      );
    };
    return (
      <form onSubmit={onSubmit} className="d-flex w-100 gap-2">
        <input
          name="body"
          value={state.body}
          onChange={onChange}
          ref={ref}
          className="form-control w-100"
          placeholder="comment..."
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    );
  }
);

export default CommentMaker;
