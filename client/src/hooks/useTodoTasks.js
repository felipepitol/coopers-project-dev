import { useState } from "react";

export function useTodoTasks() {
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);

  function addTask(task) {
    setTodo((prev) => [...prev, task]);
  }

  function updateTask(id, newLabel) {
    setTodo((prev) =>
      prev.map((t) => (t.id === id ? { ...t, label: newLabel } : t))
    );
  }
  
  function moveToDone(id) {
    const task = todo.find((t) => t.id === id);
    if (!task) return;
    setTodo((prev) => prev.filter((t) => t.id !== id));
    setDone((prev) => [...prev, task]);
  }

  function deleteTask(id) {
    setTodo((prev) => prev.filter((t) => t.id !== id));
  }

  function reorderTasks(newOrder) {
    setTodo([...newOrder]); // força re-render mesmo com mesma referência
  }

  function eraseAll(type) {
    type === "todo" ? setTodo([]) : setDone([]);
  }

  return {
    todo,
    done,
    addTask,
    moveToDone,
    deleteTask,
    updateTask,
    eraseAll,
    reorderTasks
  };
  
}
