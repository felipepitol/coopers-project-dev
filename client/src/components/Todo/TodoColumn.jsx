import { TaskItem } from "./TaskItem";

export function TodoColumn({ type = "todo", tasks = [], onEraseAll, onCheck, onDelete, onUpdate }) {
  const title = type === "todo" ? "To-do" : "Done";
  const subtitle =
    type === "todo"
      ? "Take a breath. Start doing."
      : "Congratulations! You have done tasks";
  const topBarColor = type === "todo" ? "bg-orange-500" : "bg-green-500";

  return (
    <div className="bg-white text-black rounded-md shadow-lg w-full max-w-sm">
      <div className={`h-2 w-full rounded-t-md ${topBarColor}`} />

      <div className="p-6 flex flex-col items-stretch">
        <h3 className="text-2xl font-bold text-center">{title}</h3>
        <p className="text-sm text-gray-600 text-center mb-6">{subtitle}</p>

        <ul className="flex flex-col gap-2 mb-6">
          {tasks.map((task) => (
            <TaskItem
              key={task.id + task.label}
              task={task}
              type={type}
              onCheck={onCheck}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </ul>

        <button
          onClick={onEraseAll}
          className="w-full py-3 bg-black text-white rounded hover:opacity-90 transition text-lg font-semibold self-auto"
        >
          erase all
        </button>
      </div>
    </div>
  );
}
