import mongoose from "mongoose";
import Promotion from "./promotionModel/promotion.schema";

const handleCreateNewPromotionService = async (body) => {
  const res = {
    statusCode: 201,
    message: "Create new order success",
    data: {},
  };
  try {
    const { code, minCost, reduce } = body;
    const checkExist = await Promotion.findOne({
      code: code,
    });
    if (checkExist) {
      return {
        statusCode: 500,
        message: "Code is exist",
      };
    }
    const promotionData = await new Promotion({
      _id: mongoose.Types.ObjectId(),
      code,
      minCost,
      reduce,
    });
    await Promotion.create(promotionData);
    res.data = promotionData;
  } catch (error) {
    res = {
      statusCode: 500,
      message: error.message,
    };
  }
  return res;
};

module.exports = {
  handleCreateNewPromotionService,
};
