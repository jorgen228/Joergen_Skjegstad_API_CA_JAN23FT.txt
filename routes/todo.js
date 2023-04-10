const express = require("express");
const router = express.Router();
const jsend = require("jsend");
const db = require("../models");
const TodoService = require("../services/todoService");
const todoService = new TodoService(db);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");

router.use(jsend.middleware);

router.get("/", async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const todos = await todoService.getAll();
      if (todos.length == 0) {
        return res.jsend.success({
          message:
            "There are no todos currently in the list. Create one to view it later.",
        });
      }
      return res.jsend.success({
        result: "Here is the list of all current todo-items.",
        data: todos,
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
  const { name, category } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      if (name == null || category == null) {
        return res.jsend.fail({
          message: "Please provide a name and a category!",
        });
      }
      if (!isNaN(name)) {
        return res.jsend.fail({
          message: "The provided name needs to be a string!",
        });
      }
      if (isNaN(category)) {
        return res.jsend.fail({
          message: "The provided category needs to be an integer!",
        });
      }
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      await todoService.create(name, category, decodedToken.id);
      res.jsend.success({
        message: "New item created!",
      });
    } catch (error) {
      res.jsend.fail({
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
          message: "Please provide a the item to update, and the new name!",
        });
      }
      if (!isNaN(oldName) || !isNaN(newName)) {
        return res.jsend.fail({
          message: "The provided name needs to be a string!",
        });
      }
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const todo = await todoService.getOne(oldName);
      if (todo == null) {
        return res.jsend.fail({ message: "No such todo-item exists!" });
      }
      await todoService.update(oldName, newName);
      return res.jsend.success({
        message: "Item updated",
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
          message: "Please provide the name of a todo-item!",
        });
      }
      if (!isNaN(name)) {
        return res.jsend.fail({
          message: "The provided name needs to be a string!",
        });
      }
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const todo = await todoService.getOne(name);
      if (todo == null) {
        return res.jsend.fail({ message: "No such todo-item exists!" });
      }
      await todoService.delete(name);
      return res.jsend.success({
        message: "Item deleted",
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
