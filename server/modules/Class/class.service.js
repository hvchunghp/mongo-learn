import mongoose from "mongoose";
import Class from "../User/UserModels/class.schema";

const handleCreateClassService = async (body) => {
  const respone = {
    statusCode: 201,
    message: "Created success!",
    data: {},
  };

  try {
    const res = new Class({
      _id: mongoose.Types.ObjectId(),
      name: body.name,
    });
    const newClass = await Class.create(res);
    respone.data.class = newClass;
  } catch (error) {
    respone.statusCode = 500;
    respone.message = "Created error!";
  }
  return respone;
};
const handleDeleteClassService = async (body) => {
  const response = {
    statusCode: 200,
    message: "Delete success",
  };

  try {
    await Class.findOneAndUpdate(
      {
        _id: body._id,
      },
      {
        $set: {
          isDeleted: true,
        },
      }
    ).exec();
    // response.data = deleteClass;
  } catch (err) {
    response.statusCode = 500;
    response.message = "error";
  }
  return response;
};

const handleGetClassService = async () => {
  const res = {
    statusCode: 200,
    message: "Get class success",
  };
  try {
    const classes = await Class.find({
      isDeleted: false,
    });
    res.data = classes;
  } catch (error) {
    res = {
      statusCode: 500,
      message: "Get class error",
    };
  }
  return res;
};
module.exports = {
  handleCreateClassService,
  handleDeleteClassService,
  handleGetClassService,
};
