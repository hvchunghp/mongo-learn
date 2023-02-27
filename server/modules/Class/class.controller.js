import classService from "./class.service";

const handleCreateClass = async (req, res) => {
  const { statusCode, message, data } =
    await classService.handleCreateClassService(req.body);
  return res.status(statusCode).json({ message, data });
};
const handleDeleteClass = async (req, res) => {
  const { statusCode, message, data } =
    await classService.handleDeleteClassService(req.body);
  return res.status(statusCode).json({ message, data });
};
const handleGetClass = async (req, res) => {
  const { statusCode, message, data } =
    await classService.handleGetClassService();
  return res.status(statusCode).json({ message, data });
};
module.exports = { handleCreateClass, handleDeleteClass, handleGetClass };
