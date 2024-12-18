import mongoose, { Schema, Document, mongo } from "mongoose";

export interface message extends Document {
  content: string;
  createdAt: Date;
}

const MessSchema: Schema<message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerfied: boolean;
  isAcceptingMessage: boolean;
  messages: message[];
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email Is required"],
    unique: true,
    match: [/.+\@.+\..+/, "please Use a vaild email"],
  },
  password: {
    type: String,
    required: [true, "Password Is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry Is Required"],
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessSchema],
});

const UserModel = ( mongoose.models.user as mongoose.Model<User> 
    || mongoose.model<User>("User", UserSchema)
)

  export default UserModel;

