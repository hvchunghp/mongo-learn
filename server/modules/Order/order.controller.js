import orderService from "../Order/order.service"

const handleCreateNewOrder = async (req, res) =>{
  const { statusCode, message, data } =
    await orderService.handleCreateNewOrderService(req);
  return res.status(statusCode).json({ message, data });
}

module.exports = {
  handleCreateNewOrder
}