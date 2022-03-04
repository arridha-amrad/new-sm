import { Request, Response } from 'express';
import ReplyModel from '../models/reply/ReplyModel';

export const createReply = async (req: Request, res: Response) => {
  const { username } = req.body;
  const newReply = new ReplyModel({
    username,
  });
  try {
    const reply = await newReply.save();
    return res.status(200).json({ reply });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
