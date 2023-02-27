import productService from "../Product/product.service";

const handleCreateProduct = async (req, res) => {
  const { statusCode, message, data } =
    await productService.handleCreateProductService(req.body);
  return res.status(statusCode).json({ message, data });
};
const handleGetAllProduct = async (req, res) => {
  const { statusCode, message, data } =
    await productService.handleGetAllProductService(req);
  return res.status(statusCode).json({ message, data });
}
module.exports = {
  handleCreateProduct,
  handleGetAllProduct
};
