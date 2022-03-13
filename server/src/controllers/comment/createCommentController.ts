import { Request, Response } from 'express';
import { addComment } from '../../services/CommentService';
import { findOnePost } from '../../services/PostService';

export default async (req: Request, res: Response) => {
  const { postId } = req.params;
  const commentUser = req.userId;
  const { body } = req.body;

  try {
    const post = await findOnePost(postId);
    if (post) {
      const newComment = await addComment({
        body,
        post: postId,
        owner: commentUser,
      });
      post.comments.push(newComment);
      await post.save();
      return res.status(200).json({ comment: newComment });
    }
    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
