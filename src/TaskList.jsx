import React, { useContext, useMemo, useCallback } from 'react';
import { TaskContext } from './App';

const TaskList = () => {
  const { tasks, setTasks } = useContext(TaskContext);

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const pendingTasks = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks]
  );

  const handleDeleteTask = useCallback(
    (index) => {
      setTasks([...tasks.slice(0, index), ...tasks.slice(index + 1)]);
    },
    [setTasks, tasks]
  );

  return (
    <div>
      <h2>Tareas ({tasks.length})</h2>
      <p>Completadas: {completedTasks}</p>
      <p>Pendientes: {pendingTasks}</p>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                /* Primero estamos utilizando el método slice para crear una nueva lista que contenga las tareas desde el inicio hasta la tarea que se quiere actualizar, y luego concatenando la nueva tarea modificada, y finalmente las tareas restantes en la lista original, utilizando de nuevo el método slice.

                Esto nos permite actualizar la tarea seleccionada de la lista de tareas tasks con el nuevo estado de completitud (marcándola como completada si estaba pendiente, y viceversa), sin modificar el estado de las demás tareas en la lista. */

                setTasks([
                  //Quita la tarea de la lista de pendientes
                  ...tasks.slice(0, index),
                  { text: task.text, completed: !task.completed },
                  //Añade una tarea a la lista de completadas
                  ...tasks.slice(index + 1),
                ])
              }
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
