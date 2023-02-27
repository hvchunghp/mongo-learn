import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const CATEGORY_MODEL = "category";

const categorySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, collection: CATEGORY_MODEL }
);

export default mongoose.model("category", categorySchema);
