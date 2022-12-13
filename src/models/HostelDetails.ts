import mongoose, { Document } from "mongoose";
interface hostelDetailType extends Document {
  hostelTimming: string;
  emergencyContactNumber: number;
}
const hostelDetailSchema = new mongoose.Schema({
  hostelTimming: { type: String },
  emergencyContactNumber: { type: Number },
});
export default mongoose.model<hostelDetailType>(
  "HostelDetail",
  hostelDetailSchema
);
