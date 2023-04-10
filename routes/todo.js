const express = require("express");
const router = express.Router();
const jsend = require("jsend");
const db = require("../models");
// const TodoService = require("../services/todoService");
// const todoService = new TodoService(db);


router.get("/", async (req, res, next) => {
  const todos = await todoService.getAll();
  if (todos.length == 0) {
    res.jsend.success({
      message:
        "There are no todos currently in the list. Create one to view it later.",
    });
  }
});

router.post("/", async (req, res, next) => {});

router.put("/", async (req, res, next) => {});

router.delete("/", async (req, res, next) => {});

module.exports = router;
