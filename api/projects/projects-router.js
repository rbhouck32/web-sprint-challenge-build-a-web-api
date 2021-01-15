const express = require("express");

const Projects = require("./projects-model.js");

const {
  validateProjectId,
  validateProject,
} = require("../middleware/index.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id", validateProject, validateProjectId, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "There was an error updating the project" });
    });
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `Project ${req.params.id} has successfully been deleted`,
      });
    })
    .catch(next);
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: `Error getting the actions for Project ${req.params.id}`,
      });
    });
});

module.exports = router;
