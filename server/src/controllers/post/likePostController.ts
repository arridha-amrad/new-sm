import { Request, Response } from 'express';
import { editPost, findOnePost } from '../../services/PostService';

export default async (req: Request, res: Response) => {
  const likeSender = req.userId;
  const { postId } = req.params;
  try {
    const post = await findOnePost(postId);

    const isLiked = post?.likes.find(
      (user) => user._id?.toString() === likeSender
    );

    const updatedPost = await editPost(
      postId,
      isLiked
        ? { $pull: { likes: likeSender } }
        : { $push: { likes: likeSender } }
    );

    return res.status(200).json({ post: updatedPost });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
