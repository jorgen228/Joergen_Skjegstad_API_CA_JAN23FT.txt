const express = require("express");
const router = express.Router();
const jsend = require("jsend");
const db = require("../models");
const CategoryService = require("../services/categoryService");
const categoryService = new CategoryService(db);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");

router.use(jsend.middleware);

router.get("/", async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const categories = await categoryService.getAll();
      if (categories.length == 0) {
        return res.jsend.success({
          message: "There are no categories available to view!",
        });
      }
      return res.jsend.success({
        result: "Here is the list of all categories.",
        data: categories,
      });
    } catch (error) {
      return res.jsend.fail({
        error: "Invalid Jsonwebtoken.",
      });
    }
  }
  return res.jsend.fail({
    message: "You need to be logged in to utilise this feature!",
  });
});

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      if (name == null) {
        return res.jsend.fail({
          message: "Please provide a name for the category!",
        });
      }
      if (!isNaN(name)) {
        return res.jsend.fail({
          message: "The provided name needs to be a string!",
        });
      }
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      await categoryService.create(name);
      return res.jsend.success({
        message: "New category created!",
      });
    } catch (error) {
      return res.jsend.fail({
        error: error,
      });
    }
  } else {
    return res.jsend.fail({
      message: "You need to be logged in to utilise this feature!",
    });
  }
});

router.put("/", async (req, res, next) => {
  const { oldName, newName } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      if (oldName == null || newName == null) {
        return res.jsend.fail({
          message: "Please provide a category to update, and the new name!",
        });
      }
      if (!isNaN(oldName) || !isNaN(newName)) {
        return res.jsend.fail({
          message: "The provided name needs to be a string!",
        });
      }
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const category = await categoryService.getOne(oldName);
      if (category == null) {
        return res.jsend.fail({ message: "No such category exists!" });
      }
      await categoryService.update(oldName, newName);
      return res.jsend.success({
        message: "Category updated",
      });
    } catch (error) {
      return res.jsend.fail({
        error: error,
      });
    }
  } else {
    return res.jsend.fail({
      message: "You need to be logged in to utilise this feature!",
    });
  }
});

router.delete("/", async (req, res, next) => {
  const { name } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      if (name == null) {
        return res.jsend.fail({
          message: "Please provide the name of a category!",
        });
      }
      if (!isNaN(name)) {
        return res.jsend.fail({
          message: "The provided name needs to be a string!",
        });
      }
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const category = await categoryService.getOne(name);
      if (category == null) {
        return res.jsend.fail({ message: "No such category exists!" });
      }
      await categoryService.delete(name);
      return res.jsend.success({
        message: "Category deleted",
      });
    } catch (error) {
      return res.jsend.fail({
        error: error,
      });
    }
  } else {
    return res.jsend.fail({
      message: "You need to be logged in to utilise this feature!",
    });
  }
});

module.exports = router;
