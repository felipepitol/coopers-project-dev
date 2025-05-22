import { useState } from "react";
import { useTodoTasks } from "../../hooks/useTodoTasks";
import { TodoColumn } from "./TodoColumn";
import { TaskStatus } from "../../types/types";

export function Todo() {
  const { todo, done, addTask, moveToDone, deleteTask, eraseAll, updateTask, reorderTasks } = useTodoTasks();
  const [inputValue, setInputValue] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(true); // ← depois substitui por auth real


  function handleAddTask() {
    const trimmed = inputValue.trim();
    if (trimmed === "") return;

    const newTask = {
      id: crypto.randomUUID(),
      label: trimmed,
    };

    addTask(newTask);
    setInputValue("");
  }

  return (
    <>
    <section className="relative bg-black skew-y-[-3deg] py-18">
      <div className="container mx-auto skew-y-[3deg] text-white text-center px-4">
        <h2 className="text-5xl font-bold mb-2">To-do List</h2>
        <div className="border-b-4 border-emerald-600 mx-auto w-1/7 mb-10"></div>
        <p className="text-3xl mb-10">
          Drag and drop to set your main priorities,<br /> check when done and create what’s new.
        </p>
      </div>
    </section>
    {isLoggedIn &&(
    <section className="py-30">
      {/* Input to add item */}
      <div className="max-w-md mx-auto mb-12 flex gap-2">
          <input
            type="text"
            placeholder="Add new task..."
            className="w-full px-4 py-3 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button
            onClick={handleAddTask}
            className="bg-green-500 text-white px-5 rounded hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
      {/* Colunas */}
      <div className="flex flex-col md:flex-row justify-center gap-8 items-start">
          <TodoColumn
            type={TaskStatus.TODO}
            tasks={todo}
            onEraseAll={() => eraseAll("todo")}
            onCheck={moveToDone}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onReorder={reorderTasks}
          />
          <TodoColumn
            type={TaskStatus.DONE}
            tasks={done}
            onEraseAll={() => eraseAll("done")}
          />
        </div>
    </section>
    )}
    </>
  );
}
