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

const keep = (option) => {
  option = option.toUpperCase();
  option == "Y" ? script(false) : console.log("Adiós");
};

const taskList = [
    {
      description: "Nueva tarea",
      complete: false,
    },
  ];
  
 const addTask = (description) => {
    taskList.push({
      description: description,
      complete: false,
    });
  };
  
 const deleteTask = (taskIndex) => {
    if (taskIndex == "-1") {
      console.log(
        "Utilice el menú para mostrar la lista de tareas y conocer el indicador de la misma."
      );
    } else {
      taskIndex--;
      taskList.splice(taskIndex, 1);
    }
  };
  
  const completeTask = (taskIndex) => {
    if (taskIndex == "-1") {
      console.log(
        "Utilice el menú para mostrar la lista de tareas y conocer el indicador de la misma."
      );
    } else {
      taskIndex--;
      taskList[taskIndex].complete = true;
    }
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

const script = (firstTime = true) => {
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
          addTask(description);
          myInterface.question(texts.keepQuestion, (option) => {
            keep(option);
          });
        });
        break;
      case "3":
        myInterface.question(texts.idTaskDelete, (id) => {
          deleteTask(id);
          myInterface.question(texts.keepQuestion, (option) => {
            keep(option);
          });
        });
        break;
      case "4":
        myInterface.question(texts.idTaskComplete, (id) => {
          completeTask(id);
          myInterface.question(texts.keepQuestion, (option) => {
            keep(option);
          });
        });
        break;
    }
  });
};

script();