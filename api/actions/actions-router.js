const express = require("express");
const Actions = require("./actions-model.js");

const { validateActionsId, validateAction } = require("../middleware/index.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validateActionsId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/:id", validateActionsId, validateAction, (req, res) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error Updating the Action" });
    });
});

router.delete("/:id", validateActionsId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `Action with id ${req.params.id} has successfully been deleted`,
      });
    })
    .catch(next);
});

module.exports = router;
