const Actions = require("../actions/actions-model.js");
const Projects = require("../projects/projects-model.js");

async function validateActionsId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      res
        .status(404)
        .json({ message: `Action containing id ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
}

async function validateProjectsId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      res
        .status(404)
        .json({ message: `Project containing id ${req.params.id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Bad Request" });
  }
}

function validateAction(req, res, next) {
  const body = req.body;
  const project_id = req.body.project_id;
  const description = req.body.description;
  const notes = req.body.notes;

  if (Object.keys(body).length !== 0) {
    if (project_id && description && notes) {
      next();
    } else {
      res.status(400).json({
        message: `One of the required fields is missing please check your request again`,
      });
    }
  } else {
    res.status(400).json({ message: "Missing Action data" });
  }
}

function validateProject(req, res, next) {
  const body = req.body;
  const name = req.body.name;
  const description = req.body.description;

  if (body) {
    if (name && description) {
      next();
    } else {
      res.status(400).json({
        message: `missing required fields. Please check the name and description fields again.`,
      });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

module.exports = {
  validateActionsId,
  validateProjectsId,
  validateAction,
  validateProject,
};
