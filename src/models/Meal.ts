import mongoose, { Document } from "mongoose";
interface mealType extends Document {
  mealName: string;
  units: number;
}
const mealSchema = new mongoose.Schema({
  mealName: { type: String, required: true },
  units: { type: Number, required: true },
});
export default mongoose.model<mealType>("Meal", mealSchema);
