const express = require("express");
const port = 3000;
const log = console.log;

const app = express();
const listEditRouter = require("./list-edit-router.js");
const listViewRouter = require("./list-view-router.js");

app.use("/edit", listEditRouter);
app.use("/view", listViewRouter);

const TaskList = [
    {
        "id":"123456",
        "completed":false,
        "description":"Walk the dog",
    },
];

app.get("/", (req, res) => {
    res.send(JSON.stringify(TaskList));
})

app.listen(port, (error) => {
    error ? log(error) : log("server listening...");
})