import { useEffect, useState } from "react";
import { CheckCircleIcon, TrashIcon } from "@phosphor-icons/react";

export function TaskItem({ task, type, onCheck, onDelete, onUpdate }) {
  const isDone = type === "done";
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.label);

  // 🔧 Atualiza o valor local quando a prop muda
  useEffect(() => {
    console.log("Task label updated:", task.label);
  }, [task.label]);
  

  function handleBlur() {
    setEditing(false);
    const trimmed = value.trim();
    if (trimmed !== task.label && trimmed !== "") {
      onUpdate?.(task.id, trimmed);
    }
  }

  return (
    <li className="flex justify-between items-start text-sm group">
      <div className="flex items-start gap-2 w-full">
        <button
          className={`w-5 h-5 mt-0.5 border-2 rounded-full flex items-center justify-center shrink-0 transition-all ${
            isDone ? "border-green-500 bg-green-500 text-white" : "border-orange-500"
          }`}
          onClick={() => !isDone && onCheck?.(task.id)}
        >
          {isDone ? <CheckCircleIcon size={12} weight="bold" /> : null}
        </button>

        {editing ? (
          <input
            className="w-full text-black border-b border-gray-300 focus:outline-none focus:border-green-500"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <span
            className={`leading-snug w-full ${
              isDone ? "line-through text-gray-500" : "text-black font-normal"
            } cursor-text`}
            onClick={() => !isDone && setEditing(true)}
          >
            {task.label}
          </span>
        )}
      </div>

      {!isDone && (
        <button
          className="text-gray-400 hover:text-red-500 transition ml-2"
          onClick={() => onDelete?.(task.id)}
        >
          <TrashIcon size={16} />
        </button>
      )}
    </li>
  );
}
