var express = require("express");
var jwt = require("jsonwebtoken");
var Task = require("../models/Task");

var router = express.Router();

// checks the token, same idea as sprint 14
// if you already have an auth middleware file, use that instead of this
function checkToken(req, res, next) {
  var header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "No token" });
  }
  var token = header.split(" ")[1];
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    // NOTE: this must match what you put inside jwt.sign in auth.js
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Bad token" });
  }
}

// CREATE
router.post("/", checkToken, function (req, res) {
  if (!req.body.title) {
    return res.status(400).json({ message: "Title is required" });
  }
  var task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    authorId: req.userId // comes from the token, not from the user
  });
  task.save()
    .then(function (saved) {
      res.status(201).json(saved);
    })
    .catch(function (err) {
      res.status(500).json({ message: err.message });
    });
});

// READ (only my tasks)
router.get("/", checkToken, function (req, res) {
  Task.find({ authorId: req.userId })
    .then(function (tasks) {
      res.json(tasks);
    })
    .catch(function (err) {
      res.status(500).json({ message: err.message });
    });
});

// UPDATE
router.put("/:id", checkToken, function (req, res) {
  Task.findById(req.params.id)
    .then(function (task) {
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      // ownership check, not my task = 403
      if (task.authorId.toString() !== req.userId) {
        return res.status(403).json({ message: "Not your task" });
      }
      task.title = req.body.title;
      task.description = req.body.description;
      task.status = req.body.status;
      task.priority = req.body.priority;
      return task.save().then(function (updated) {
        res.json(updated);
      });
    })
    .catch(function (err) {
      res.status(500).json({ message: err.message });
    });
});

// DELETE
router.delete("/:id", checkToken, function (req, res) {
  Task.findById(req.params.id)
    .then(function (task) {
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      if (task.authorId.toString() !== req.userId) {
        return res.status(403).json({ message: "Not your task" });
      }
      return task.deleteOne().then(function () {
        res.json({ message: "Deleted", id: req.params.id });
      });
    })
    .catch(function (err) {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;