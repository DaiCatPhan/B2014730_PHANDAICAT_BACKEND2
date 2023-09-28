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

exports.findAll = (req, res) => {
  res.json({ message: "findAll handler" });
};

exports.findOne = (req, res) => {
  res.json({ message: "findOne handler" });
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
