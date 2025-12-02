import TaskColumn from "./TaskColumn";
import { Task } from "../types/task";

interface TaskBoardProps {
  todoTasks: Task[];
  inProgressTasks: Task[];
  doneTasks: Task[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (status: "todo" | "inProgress" | "done") => void;
  onDragStart: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskBoard({
  todoTasks,
  inProgressTasks,
  doneTasks,
  onDragOver,
  onDrop,
  onDragStart,
  onEdit,
  onDelete,
}: TaskBoardProps) {
  return (
    <div className="bg-black flex flex-col md:flex-row text-center gap-5 w-full max-w-7xl flex-1 p-5 rounded-lg shadow-lg overflow-hidden">
      <TaskColumn
        title="Para fazer"
        tasks={todoTasks}
        status="todo"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TaskColumn
        title="Em andamento"
        tasks={inProgressTasks}
        status="inProgress"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TaskColumn
        title="Pronto"
        tasks={doneTasks}
        status="done"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
