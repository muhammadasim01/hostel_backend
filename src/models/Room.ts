import mongoose, { Document } from "mongoose";

interface roomType extends Document {
  price: string;
  bookByUser: string;
  totalSeates: number;
  seatsRemaining: number;
  isBooked: boolean;
}
const roomSchema = new mongoose.Schema({
  price: {
    type: String,
    required: true,
  },
  bookedByUser: {
    type: String,
  },
  totalSeates: {
    type: Number,
    required: true,
  },
  seatsRemaining: {
    type: Number,
  },
  isBooked: { type: Boolean },
});
export default mongoose.model<roomType>("Room", roomSchema);
