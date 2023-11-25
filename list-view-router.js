const express = require("express");

const router = express.Router();

const TaskList = [
    {
        "id":"123456",
        "completed":false,
        "description":"Walk the dog",
    },
    {
        "id":"234567",
        "completed":true,
        "description":"Feed my dog",
    },
];

router.get("/complete", (req, res) => {
    res.send(JSON.stringify(TaskList.filter((task) => task.completed)));
});

router.get("/incomplete", (req, res) => {
    res.send(JSON.stringify(TaskList.filter((task) => !task.completed)));
});

module.exports = router;