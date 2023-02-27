import categoryService from "../Category/category.service";

const handleCreateNewCategory = async (req, res) => {
  const { statusCode, message, data } =
    await categoryService.handleCreateNewCategoryService(req.body);
  return res.status(statusCode).json({ message, data });
};
const handleGetAllCategory = async (req, res) => {
  const { statusCode, message, data } =
    await categoryService.handleGetAllCategoryService();
  return res.status(statusCode).json({ message, data });
};
const handleUpdateCategory = async (req, res) => {
  const { statusCode, message, data } =
    await categoryService.handleUpdateCategoryService(req.body);
  return res.status(statusCode).json({ message, data });
};
const handleDeleteCategory = async (req, res) => {
  const { statusCode, message, data } =
    await categoryService.handleDeleteCategoryService(req.body);
  return res.status(statusCode).json({ message, data });
};
module.exports = {
  handleCreateNewCategory,
  handleGetAllCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};
