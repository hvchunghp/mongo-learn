import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const CATEGORY_DISCUSSION_MODEL = "categoryDiscussion";

const categorySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isPinned: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, collection: CATEGORY_DISCUSSION_MODEL }
);

export default mongoose.model("categoryDiscussion", categorySchema);
