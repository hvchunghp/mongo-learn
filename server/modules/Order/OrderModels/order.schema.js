import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const ORDER_MODEL = "orders";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    item: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        totalItemPrice: {
          type: Number,
          default: 0,
        },
      },
    ],
    promotionCode: {
      type: String,
    },
    totalCost: {
      type: Number,
      default: 0,
      required: true,
    },
    note: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true, collection: ORDER_MODEL }
);

export default mongoose.model("orders", orderSchema);
