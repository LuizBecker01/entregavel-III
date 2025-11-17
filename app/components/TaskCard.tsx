import { Pencil, X } from "lucide-react";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done";
};

type TaskCardProps = {
  task: Task;
  onDragStart: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

export default function TaskCard({
  task,
  onDragStart,
  onEdit,
  onDelete,
}: TaskCardProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(task)}
      className="bg-zinc-700 p-2 rounded-lg shadow text-left cursor-move hover:bg-zinc-600 transition-colors"
    >
      <div className="flex items-center justify-between mb-0.5">
        <div className="flex-1">
          <div className="text-xs text-zinc-400">#{task.id}</div>
          <h3 className="font-bold text-white text-sm">{task.title}</h3>
          <p className="text-zinc-300 text-sm">{task.description}</p>
        </div>
        <div className="flex gap-1">
          <button
            className="bg-amber-500 hover:bg-amber-400 text-white px-2 py-1 rounded text-sm"
            title="Editar"
            onClick={() => onEdit?.(task)}
          >
            <Pencil size={14} />
          </button>
          <button
            className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-sm"
            title="Deletar"
            onClick={() => onDelete?.(task)}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
