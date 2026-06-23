import React, { useState, ChangeEvent, FormEvent } from 'react';
import './App.css';

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Трекер завдань</h1>
      
      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          placeholder="Введіть нове завдання..."
          value={inputValue}
          onChange={handleInputChange}
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          Додати
        </button>
      </form>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTaskCompletion(task.id)}
            className={`todo-item ${task.isCompleted ? 'completed' : ''}`}
          >
            <span className="todo-text">{task.text}</span>
            <button
              onClick={(e) => deleteTask(task.id, e)}
              className="delete-button"
              title="Видалити"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="empty-message">Список завдань порожній. Додайте щось!</p>
      )}
    </div>
  );
}

export default App;
