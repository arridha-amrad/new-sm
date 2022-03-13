import { Request, Response } from 'express';
import { findUserById } from '../../services/UserServices';

export default async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    let user = null;
    user = await findUserById(userId, '_id username email avatarURL fullName');
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
