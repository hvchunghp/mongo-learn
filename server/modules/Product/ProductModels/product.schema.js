import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const PRODUCT_MODEL = "products";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    desciption: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, collection: PRODUCT_MODEL }
);

export default mongoose.model("products", productSchema);
