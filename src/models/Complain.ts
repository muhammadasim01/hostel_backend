import mongoose, { Document } from "mongoose";
interface complainType extends Document {
  userId: string;
  userName: string;
  complainMessage: string;
}
const complainSchema = new mongoose.Schema({
  userId: { type: String, requied: true },
  userName: { type: String, requied: true },
  complainMessage: { type: String, requied: true },
});

export default mongoose.model<complainType>("Complain", complainSchema);
