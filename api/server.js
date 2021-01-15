const express = require("express");

const actionsRouter = require("./actions/actions-router.js");
const projectsRouter = require("./projects/projects-router.js");

const server = express();

server.use(express.json());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`
            <h2> Our Api is Up and Running</h2>
            <p> Please refer to the READ ME for more information</p>
         `);
});
module.exports = server;
