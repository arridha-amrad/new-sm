import { Schema, model, Model } from 'mongoose';

interface IReplyModel {
  username: string;
}

const ReplySchema = new Schema<IReplyModel, Model<IReplyModel>>({
  username: String,
});

const ReplyModel = model<IReplyModel>('Reply', ReplySchema);

export default ReplyModel;
