import mongoose from "mongoose";
import Order from "./OrderModels/order.schema";
import Product from "../Product/ProductModels/product.schema";
import User from "../User/UserModels/user.schema";
import Promotion from "../Promotion/promotionModel/promotion.schema";

const handleCreateNewOrderService = async (req) => {
  const res = {
    statusCode: 201,
    message: "create order success",
    data: {},
  };
  try {
    const { item, note, promotionCode } = req.body;
    let productItemId = [];
    item.map(async (el) => productItemId.push(el.productId));

    const newItems = await Product.find({ _id: { $in: productItemId } });
    // console.log(newItems);

    let totalCost = 0;
    for (let i = 0; i < newItems.length; i++) {
      totalCost = totalCost + newItems[i].cost * item[i].quantity;
    }
    let promotion;
    if (promotionCode) {
      promotion = await Promotion.findOne({
        code: promotionCode,
      });
      const { minCost, reduce } = promotion;
      if (totalCost > minCost) {
        totalCost = totalCost - reduce;
      }
      console.log(promotion);
    }
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      userId: req.user._id,
      item: req.body.item,
      note,
      totalCost,
    });
    const user = await User.findById(order.userId).select("-password");
    const newOrder = await Order.create(order);
    res.data = {
      orderDetail: {
        user,
        order: newOrder,
        promotion,
      },
    };
  } catch (error) {
    res = {
      statusCode: 500,
      message: error.message,
    };
  }
  return res;
};

module.exports = {
  handleCreateNewOrderService,
};
