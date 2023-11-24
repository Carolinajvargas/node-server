const express = require("express");

const port= 3000;

const app = express();

const taskList = [
  {
    name: "Tarea",
    complete: false,
    id: "0",
  }
]

app.get("/task", (req, res) => {
  res.status(200).send(JSON.stringify(taskList));
})

app.listen(port, (error) => {
  error ? console.log(error) : console.log("server listening...")
})