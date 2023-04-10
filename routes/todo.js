const express = require("express");
const router = express.Router();
const jsend = require("jsend");
const db = require("../models");
const TodoService = require("../services/todoService");
const todoService = new TodoService(db);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.use(jsend.middleware);

router.get("/", async (req, res, next) => {
  const todos = await todoService.getAll();
  if (todos.length == 0) {
    res.jsend.success({
      message:
        "There are no todos currently in the list. Create one to view it later.",
    });
  }
  res.jsend.success({
    result: "Here is the list of all current todo-items.",
    data: todos,
  });
});

router.post("/", async (req, res, next) => {
  const name = req.body.name;
  const categoryID = req.body.category;
  if (!isNaN(name)) {
    res.jsend.fail({
      error: "The provided name needs to be a string!",
    });
  } else {
    await todoService.create(name);
    res.jsend.success({
      result: "New item created!",
    });
  }
});

router.put("/", async (req, res, next) => {});

router.delete("/", async (req, res, next) => {});

module.exports = router;
