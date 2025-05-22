import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskItem } from "./TaskItem";

export function SortableItem(props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition
  } = useSortable({
    id: props.task.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <li ref={setNodeRef} style={style}>
      <TaskItem {...props} dragHandle={{ attributes, listeners }} />
    </li>
  );
}
