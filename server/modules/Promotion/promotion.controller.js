import promotionService from "../Promotion/promotion.service";

const handleCreateNewPromotion = async (req, res) => {
  const { statusCode, message, data } =
    await promotionService.handleCreateNewPromotionService(req.body);
  return res.status(statusCode).json({ message, data });
};

module.exports = {
  handleCreateNewPromotion,
};
