import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { TaskItem } from "./TaskItem";

export function TodoColumn({
  type = "todo",
  tasks = [],
  onEraseAll,
  onCheck,
  onDelete,
  onUpdate,
  onReorder,
}) {
  const title = type === "todo" ? "To-do" : "Done";
  const subtitle =
    type === "todo"
      ? "Take a breath. Start doing."
      : "Congratulations! You have done tasks";
  const topBarColor = type === "todo" ? "bg-orange-500" : "bg-green-500";

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);
    const newOrder = arrayMove(tasks, oldIndex, newIndex);
    onReorder(newOrder);
  }

  // filtra itens inválidos antes de renderizar
  const validTasks = tasks.filter((t) => t && t.id);

  return (
    <div className="bg-white text-black rounded-md shadow-lg w-full max-w-sm">
      <div className={`h-2 w-full rounded-t-md ${topBarColor}`} />
      <div className="p-6 flex flex-col items-stretch">
        <h3 className="text-2xl font-bold text-center">{title}</h3>
        <p className="text-sm text-gray-600 text-center mb-6">{subtitle}</p>

        {type === "todo" ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={validTasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="flex flex-col gap-2 mb-6">
                {validTasks.map((task) => (
                  <SortableItem
                    key={task.id}
                    task={task}
                    type={type}
                    onCheck={onCheck}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        ) : (
          <ul className="flex flex-col gap-2 mb-6">
            {validTasks.map((task) => (
              <li key={task.id}>
                <TaskItem
                  task={task}
                  type={type}
                  onCheck={onCheck}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onEraseAll}
          className="w-full py-3 bg-black text-white rounded hover:opacity-90 transition text-lg font-semibold"
        >
          erase all
        </button>
      </div>
    </div>
  );
}