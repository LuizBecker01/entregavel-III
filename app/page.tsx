"use client";

import { useState } from "react";
import TaskColumn from "./components/TaskColumn";
import { Task } from "./types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 5, title: "Testes", description: "impossível", status: "todo" },
    {
      id: 6,
      title: "Outra tarefa",
      description: "descrição aqui",
      status: "todo",
    },
    { id: 7, title: "Mais uma", description: "mais detalhes", status: "todo" },
    {
      id: 1,
      title: "Não foi eu não",
      description: "Concerteza foi o fê",
      status: "inProgress",
    },
    {
      id: 2,
      title: "Segunda tarefa",
      description: "em progresso",
      status: "inProgress",
    },
    {
      id: 3,
      title: "Terceira tarefa",
      description: "quase lá",
      status: "inProgress",
    },
    {
      id: 8,
      title: "Tarefa concluída",
      description: "finalizada",
      status: "done",
    },
    { id: 9, title: "Outra pronta", description: "completa", status: "done" },
    { id: 10, title: "Última feita", description: "terminada", status: "done" },
  ]);

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: "todo" | "inProgress" | "done") => {
    if (draggedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === draggedTask.id ? { ...task, status } : task
        )
      );
      setDraggedTask(null);
    }
  };

  const handleEdit = (task: Task) => {
    console.log("Editar tarefa:", task);
  };

  const handleDelete = (task: Task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="flex flex-col h-full bg-zinc-50 font-sans dark:bg-amber-600">
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="flex items-center p-5 bg-black max-w-3xl rounded-lg justify-center">
          <h1 className="text-3xl font-bold">
            Arrume suas tarefas com Tarify!
          </h1>
        </div>
        <div className="bg-black flex flex-row text-center gap-5 h-2/3 w-3/4 mt-10 p-5 rounded-lg shadow-lg justify-around">
          <TaskColumn
            title="Para fazer"
            tasks={todoTasks}
            status="todo"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <TaskColumn
            title="Em andamento"
            tasks={inProgressTasks}
            status="inProgress"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <TaskColumn
            title="Pronto"
            tasks={doneTasks}
            status="done"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
