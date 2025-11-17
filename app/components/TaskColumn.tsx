import TaskCard from "./TaskCard";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done";
};

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  status: "todo" | "inProgress" | "done";
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (status: "todo" | "inProgress" | "done") => void;
  onDragStart: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

export default function TaskColumn({
  title,
  tasks,
  status,
  onDragOver,
  onDrop,
  onDragStart,
  onEdit,
  onDelete,
}: TaskColumnProps) {
  return (
    <div
      className="flex flex-col gap-2 flex-1 bg-zinc-800 p-4 rounded-lg overflow-y-auto"
      onDragOver={onDragOver}
      onDrop={() => onDrop(status)}
    >
      <h2 className="text-lg font-bold text-amber-500 mb-5">{title}</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDragStart={onDragStart}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
