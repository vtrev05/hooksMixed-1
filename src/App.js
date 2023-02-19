import React, { useState } from 'react';
import TaskList from './TaskList';

export const TaskContext = React.createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      setTasks([...tasks, { text: newTaskText, completed: false }]);
      setNewTaskText('');
    }
  };

  const handleNewTaskTextChange = (event) => {
    setNewTaskText(event.target.value);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <div>
        <h1>Lista de tareas</h1>
        <div>
          <input
            type="text"
            value={newTaskText}
            onChange={handleNewTaskTextChange}
            id="taskText"
          />
          <button onClick={handleAddTask}>Agregar tarea</button>
        </div>
        <TaskList />
      </div>
    </TaskContext.Provider>
  );
};

export default App;
