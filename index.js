import * as readline from "readline";

const myInterface = readline.createInterface(process.stdin, process.stdout);

const texts = {
  greetings: "Bienvenidx, cuéntame qué deseas hacer el día de hoy.",
  mainMenu: `
    1. Ver lista de tareas.
    2. Agregar una tarea. 
    3. Eliminar una tarea.
    4. Marcar una tarea como terminada.
    `,
  newRound: "¿Qué deseas hacer ahora?",
  keepQuestion: "¿Deseas volver a ver el menú? Y/N",
  addDescription: "Por favor, escriba el nombre de la tarea",
  idTaskDelete:
    "Por favor, escriba el indicador de la tarea que desea eliminar. Si no lo sabe, escriba -1",
  idTaskComplete:
    "Por favor, escriba el indicador de la tarea completada. Si no lo sabe, escriba -1",
};


const taskList = [
  {
    description: "Nueva tarea",
    complete: false,
  },
];

function addTask (description) {
  return new Promise ((resolve, reject) => {
    taskList.push({
      description: description,
      complete: false,
    });
    setTimeout(() => {
      resolve("resolved");
  },3000);
  });
};

const deleteTask = (taskIndex) => {
  return new Promise((resolve, reject) => {
    if (taskIndex == "-1") {
      console.log(
        "Utilice el menú para mostrar la lista de tareas y conocer el indicador de la misma."
      );
    } else {
      taskIndex--;
      taskList.splice(taskIndex, 1);
    }
    setTimeout(() => {
      resolve("resolved");
    }, 3000);
  });
};

const completeTask = (taskIndex) => {
  return new Promise((resolve) => {
    if (taskIndex == "-1") {
      console.log(
        "Utilice el menú para mostrar la lista de tareas y conocer el indicador de la misma."
      );
    } else {
      taskIndex--;
      taskList[taskIndex].complete = true;
    };
    setTimeout(() => {
      resolve("resolved");
    }, 3000);
  });
  
};

const showTasks = () => {
  console.log("LISTA DE TAREAS:");
  taskList.forEach((task, index) => {
    console.log(`
        Indicador: ${index+1}.
        Descripción: ${task.description}
        Estado: ${task.complete ? "completada" : "no completada"}
        `);
  });
};

const keep = (option) => {
  option = option.toUpperCase();
  option == "Y" ? script(false) : console.log("Adiós");
};

async function newTask(description) {
  console.log("calling...");
  const result = await addTask(description);
  console.log(result);
  myInterface.question(texts.keepQuestion, (option) => {
    keep(option);
  });
};

function script(firstTime = true){
  firstTime ? console.log(texts.greetings) : console.log(texts.newRound);
  myInterface.question(texts.mainMenu, (option) => {
    switch (option) {
      case "1":
        showTasks();
        myInterface.question(texts.keepQuestion, (option) => {
          keep(option);
        });
        break;
      case "2":
        myInterface.question(texts.addDescription, (description) => {
          newTask(description);
        });
        break;
      case "3":
        myInterface.question(texts.idTaskDelete, (id) => {
          console.log("calling...");
          deleteTask(id).then((resolve) => {
            console.log(resolve);
            myInterface.question(texts.keepQuestion, (option) => {
              keep(option);
            });
          }); 
        });
        break;
      case "4":
        myInterface.question(texts.idTaskComplete, (id) => {
          console.log("calling...");
          completeTask(id).then((resolve) => {
            console.log(resolve);
            myInterface.question(texts.keepQuestion, (option) => {
              keep(option);
            });
          });
        });
        break;
    }
  });
};

script();