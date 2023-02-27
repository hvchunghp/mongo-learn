import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const USER_MODEL = "users";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password:{
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, collection: USER_MODEL }
);

export default mongoose.model("users", userSchema);
