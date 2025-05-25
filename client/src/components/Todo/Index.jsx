import { useState } from "react";
import { useTodoTasks } from "../../hooks/useTodoTasks";
import { TodoColumn } from "./TodoColumn";
import { TaskStatus } from "../../types/types";

export function Todo() {
  const {
    todo,
    done,
    addTask,
    moveToDone,
    deleteTask,
    eraseAll,
    updateTask,
    reorderTasks,
  } = useTodoTasks();
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn] = useState(true); // substituir por auth real depois

  const handleAddTask = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    addTask({ id: crypto.randomUUID(), label: trimmed });
    setInputValue("");
  };

  return (
    <section
      id="todo"
      aria-labelledby="todo-heading"
      className="relative overflow-visible"
    >
      {/* 1) Fundo preto enviesado */}
      <div className="bg-black skew-y-[-3deg] pt-16 pb-8">
        <div className="container mx-auto skew-y-[3deg] text-center text-white px-4">
          <h2
            id="todo-heading"
            className="text-4xl md:text-5xl font-bold mb-2"
          >
            To-do List
          </h2>
          <div className="mx-auto mb-8 w-16 h-1 bg-emerald-600"></div>
          <p className="text-base md:text-xl">
            Drag and drop to set your main priorities,<br />
            check when done and create what’s new.
          </p>
        </div>
      </div>

      {/* 2) Área de criação e colunas */}
      {isLoggedIn && (
        <div className="py-12 px-4">
          {/* 2.1) Input de nova tarefa */}
          <div className="max-w-md mx-auto mb-12 flex">
            <label htmlFor="new-task" className="sr-only">
              Add new task
            </label>
            <input
              id="new-task"
              type="text"
              placeholder="Add new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              className="
                flex-1 
                border border-gray-300 
                rounded-l-lg 
                px-4 py-3 
                text-black 
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
            />
            <button
              type="button"
              onClick={handleAddTask}
              className="
                bg-green-500 text-white 
                px-6 rounded-r-lg 
                hover:bg-green-600 
                focus:outline-none focus:ring-2 focus:ring-green-400
                transition
              "
            >
              Add
            </button>
          </div>

          {/* 2.2) Colunas To-do e Done */}
          <div className="container mx-auto flex flex-col sm:mx-auto sm:flex-col md:flex-row justify-center gap-8">
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
              onCheck={moveToDone}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          </div>
        </div>
      )}
    </section>
  );
}
