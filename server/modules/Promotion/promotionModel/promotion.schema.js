import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const PROMOTION_MODEL = "promotion";

const promotionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    minCost: { type: Number, default: 0 },
    reduce: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, collection: PROMOTION_MODEL }
);

export default mongoose.model("promotion", promotionSchema);
