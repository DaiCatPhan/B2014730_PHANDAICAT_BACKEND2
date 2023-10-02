const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);

    res.send(document);
  } catch (error) {
    console.log(">>> err", error);
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const contactService = new ContactService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await contactService.findByName(name);
    } else {
      documents = await contactService.find({});
    }
  } catch (error) {
    console.log(">>> err", error);
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Ket noi that bai"));
    }
    return res.send(document);
  } catch (error) {
    console.log(">>> err", error);
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

exports.update = (req, res) => {
  res.json({ message: "Update  handler" });
};

exports.delete = (req, res) => {
  res.json({ message: "delete handler" });
};

exports.deleteAll = (req, res) => {
  res.json({ message: "deleteAll handler" });
};

exports.findAllFavorite = (req, res) => {
  res.json({ message: "findAllFavorite handler" });
};
