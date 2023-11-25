const express = require("express");
require("dotenv").config();
const port = 3000;

const app = express();

const TaskList = [
    {
        "id":"123456",
        "isCompleted":false,
        "description":"Walk the dog",
    },
];

app.use(express.json());
app.use((req, res, next) => {
    const method = req.method;
    const methods = ["POST", "PUT", "DELETE", "GET"];
    
    methods.includes(method) ? next() : res.status(400).send("Método inválido");
});

const errorValidation = (req, res, next) => {
    const {method, body} = req;
  
    if (method === "POST"){
      !Object.keys(req.body).length ? res.status(400).send("No se recibieron datos") : body.description ? next() : res.status(400).send("Los datos están incompletos");
    };
};

app.get("/", (req, res) => {
    res.status(200).send(JSON.stringify(TaskList));
});

app.get("/completed", (req, res) => {
    res.status(200).send(JSON.stringify(TaskList.filter((task) => task.isCompleted)));
});

app.get("/ongoing", (req, res) => {
    res.status(200).send(JSON.stringify(TaskList.filter((task) => !task.isCompleted)));
});

app.get("/task/:id", (req, res) => {
    const id= req.params.id;
    const selectedTask = TaskList.find((task) => task.id == id);

    selectedTask ? res.status(200).send(JSON.stringify(selectedTask)) : res.status(401).send("El ID no es válido");
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const index = TaskList.findIndex((task) => task.id == id);

  if (index == -1) {
    res.status(401).send("El ID no es válido");
  } else {
    TaskList[index].isCompleted = !TaskList[index].isCompleted;
    res.status(200).send(`Tarea con ID No. ${id} actualizada con éxito`);
  };
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = TaskList.findIndex((task) => task.id == id);

  if (index == -1) {
    res.status(401).send("El ID no es válido");
  } else {
    TaskList.splice(index, 1);
    res.status(200).send(`Se eliminó la tarea con ID No. ${id}`);
  };
});

app.post("/", errorValidation, (req, res) => {
  description = req.body.description;
  id= TaskList[TaskList.length - 1].id + 1;

  TaskList.push({
    id,
    description,
    isCompleted : false,
  });
  
  res.status(200).send("La tarea se ha creado con éxito");
});

app.listen(port, (error) => {
    error ? console.log(error) : console.log("server listening...");
});