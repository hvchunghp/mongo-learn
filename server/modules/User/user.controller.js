import userService from "../User/user.service";

// const handleCreateCourse = async (req, res) => {
//   const { statusCode, message, data } =
//     await userService.handleCreateCourseService(req.body);
//   return res.status(statusCode).json({ message, data });
// };

// const handleGetCourse = async (req, res) => {
//   const { statusCode, message, data } =
//     await userService.handleGetCourseService();
//   return res.status(statusCode).json({ message, data });
// };

// const handleGetSingleCourse = async (req, res) => {
//   const { statusCode, message, data } =
//     await userService.handleGetSingleCourseService(req.body);
//   return res.status(statusCode).json({ message, data });
// };
// const handleUpdateCourse = async (req, res) => {
//   const { statusCode, message, data } = await userService.handleUpdateCourseService(
//     req.body
//   );
//   return res.status(statusCode).json({ message, data });
// };

// const handleCreateNewUser = async (req, res) =>{
//   const { statusCode, message, data } = await userService.handleCreateNewUserService(
//     req.body
//   );
//   return res.status(statusCode).json({ message, data });
// }
// const handleGetSingleUser = async (req, res) => {
//   const { statusCode, message, data } = await userService.handleGetSingleUserService(
//     req.query
//   );
//   return res.status(statusCode).json({ message, data });
// }

const handleCreateNewUser = async (req, res) => {
  const { statusCode, message, data } =
    await userService.handleCreateNewUserService(req.body);
  return res.status(statusCode).json({ message, data });
};
const handleLogin = async (req, res) => {
  const { statusCode, message, data } = await userService.handleLoginService(
    req.body
  );
  return res.status(statusCode).json({ message, data });
};
const handleChangePassword = async (req, res) => {
  const { statusCode, message, data } =
    await userService.handleChangePasswordService(req);
  return res.status(statusCode).json({ message, data });
};
const handleDeleteUser = async (req, res) => {
  const { statusCode, message, data } =
    await userService.handleDeleteUserService(req.body);
  return res.status(statusCode).json({ message, data });
};
const handleGetAllUser = async (req,res) => {
  const { statusCode, message, data } =
  await userService.handleGetAllUserService(req.body);
return res.status(statusCode).json({ message, data });
}
module.exports = {
  handleCreateNewUser,
  handleLogin,
  handleChangePassword,
  handleDeleteUser,
  handleGetAllUser
};
