import CategoryService from "../CategoryDiscussion/Category.service";

const handleCreateNewCategory = async (req, res) => {
  const { statusCode, message, data } =
    await CategoryService.handleCreateNewCategoryService(req.body);
  return res.status(statusCode).json({ message, data });
};

const handleGetAllCategory = async (req, res) => {
  const { statusCode, message, data } =
    await CategoryService.handleGetAllCategoryService();
  return res.status(statusCode).json({ message, data });
};

const handleDeleteCategory = async (req, res) => {
  const { statusCode, message, data } =
    await CategoryService.handleDeleteCategoryService(req.body);
  return res.status(statusCode).json({ message, data });
};

const handleUpdateCategory = async (req, res) => {
  const { statusCode, message, data } =
    await CategoryService.handleUpdateCategoryService(req.body);
  return res.status(statusCode).json({ message, data });
};

module.exports = {
  handleCreateNewCategory,
  handleGetAllCategory,
  handleDeleteCategory,
  handleUpdateCategory,
};
