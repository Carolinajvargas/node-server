const express = require("express");

const router = express.Router();

const TaskList = [
    {
        id:"123456",
        completed:false,
        description:"Walk the dog",
    },
];

router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Se actualizará la tarea con ID No. ${id}`);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Se eliminará la tarea con ID No. ${id}`);
});

router.post("/", (req, res) => {
    const newTask = req.body.description;

    req.body.description ? TaskList.push({
        id: Math.random()*100000,
        completed: false,
        description,
    }) : res.send("Ocurrió un error con los datos proporcionados.");
  res.send("se recibe en el body la nueva tarea");
});

module.exports = router;