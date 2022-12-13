import mongoose, { Document } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
type Password = string;

interface userType extends Document {
  name: String;
  email: String;
  password: String;
  confirmPassword: String;
  roomId: String;
  isActive: Boolean;
  token: String;
  tokens: Array<String>;
  generateToken: () => string;
  isAuthenticated: Boolean;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  roomId: {
    type: String,
  },
  isActive: { type: Boolean },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  isAuthenticated: { type: Boolean },
  billPaid: { type: Boolean },
  totalBill: { type: Number, default: 0 },
  accountType: {
    type: String,
    enum: ["STUDENT", "WORKER", "ADMIN"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password as string, salt);
    this.confirmPassword = this.password;
  }
  next();
});

userSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { id: this._id, name: this.name },
    process.env.SECRET_KEY as string
  );
  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token as string;
};

export default mongoose.model<userType>("User", userSchema);
