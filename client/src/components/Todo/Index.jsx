import { useState } from "react";
import { useTodoTasks } from "../../hooks/useTodoTasks";
import { TodoColumn } from "./TodoColumn";
import { TaskStatus } from "../../types/types";
import { useAuth } from "../../contexts/AuthContext";

export function Todo() {
  const { session } = useAuth();
  const {
    todo,
    done,
    addTask,
    moveToDone,
    deleteTask,
    updateTask,
    eraseAll,
    reorderTasks,
  } = useTodoTasks();

  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    addTask(trimmed);
    setInputValue("");
  };

  return (
    <section id="todo" aria-labelledby="todo-heading" className="relative">
      {/* header todo */}
      <div className="bg-black skew-y-[-3deg] py-16">
        <div className="container mx-auto skew-y-[3deg] text-center text-white">
          <h2 id="todo-heading" className="text-5xl font-bold mb-2">
            To-do List
          </h2>
          <div className="mx-auto mb-8 w-16 h-1 bg-emerald-600"></div>
          <p className="text-xl">
            Drag &amp; drop to set your priorities,<br />
            check when done and add what’s new.
          </p>
        </div>
      </div>

      {/* Conteúdo da seção: login ou lista */}
      <div className="py-12 px-4">
        {!session ? (
          <p className="text-center text-lg">
            Please sign in to view your To-Do list.
          </p>
        ) : (
          <>
            {/* Input e botão de adicionar */}
            <div className="max-w-md mx-auto mb-12 flex gap-2">
              <input
                type="text"
                placeholder="Add new task..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 outline-none"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-6 rounded-r-lg hover:bg-green-600 transition"
              >
                Add
              </button>
            </div>

            {/* As colunas de tarefas, centralizadas */}
            <div className="container mx-auto flex flex-col md:flex-row gap-8 justify-center">
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
          </>
        )}
      </div>
    </section>
  );
}
