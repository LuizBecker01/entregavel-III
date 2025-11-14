"use client";

import { Pencil, X } from "lucide-react";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done";
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 5, title: "Testes", description: "impossível", status: "todo" },
    { id: 6, title: "Outra tarefa", description: "descrição aqui", status: "todo" },
    { id: 7, title: "Mais uma", description: "mais detalhes", status: "todo" },
    { id: 1, title: "Não foi eu não", description: "Concerteza foi o fê", status: "inProgress" },
    { id: 2, title: "Segunda tarefa", description: "em progresso", status: "inProgress" },
    { id: 3, title: "Terceira tarefa", description: "quase lá", status: "inProgress" },
    { id: 8, title: "Tarefa concluída", description: "finalizada", status: "done" },
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
      setTasks(tasks.map(task => 
        task.id === draggedTask.id ? { ...task, status } : task
      ));
      setDraggedTask(null);
    }
  };

  const todoTasks = tasks.filter(task => task.status === "todo");
  const inProgressTasks = tasks.filter(task => task.status === "inProgress");
  const doneTasks = tasks.filter(task => task.status === "done");

  return (
    <div className="flex flex-col h-full bg-zinc-50 font-sans dark:bg-amber-600">
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="flex items-center p-5 bg-black max-w-3xl rounded-lg justify-center">
          <h1 className="text-3xl font-bold">Arrume suas tarefas com Tarify!</h1>
        </div>
        <div className="bg-black flex flex-row text-center gap-5 h-2/3 w-3/4 mt-10 p-5 rounded-lg shadow-lg justify-around">
        {/* Para fazer */}
        <div 
          className="flex flex-col gap-2 flex-1 bg-zinc-800 p-4 rounded-lg overflow-y-auto"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("todo")}
        >
          <h2 className="text-lg font-bold text-amber-500 mb-5">Para fazer</h2>
          
          {todoTasks.map(task => (
            <div 
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(task)}
              className="bg-zinc-700 p-2 rounded-lg shadow text-left cursor-move hover:bg-zinc-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex-1">
                  <div className="text-xs text-zinc-400">#{task.id}</div>
                  <h3 className="font-bold text-white text-sm">{task.title}</h3>
                  <p className="text-zinc-300 text-sm">{task.description}</p>
                </div>
                <div className="flex gap-1">
                  <button className="bg-amber-500 hover:bg-amber-400 text-white px-2 py-1 rounded text-sm" title="Editar">
                    <Pencil size={14} />
                  </button>
                  <button className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-sm" title="Deletar">
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Em andamento */}
        <div 
          className="flex flex-col gap-2 flex-1 bg-zinc-800 p-4 rounded-lg overflow-y-auto"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("inProgress")}
        >
          <h2 className="text-lg font-bold text-amber-500 mb-5">Em andamento</h2>
          
          {inProgressTasks.map(task => (
            <div 
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(task)}
              className="bg-zinc-700 p-2 rounded-lg shadow text-left cursor-move hover:bg-zinc-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex-1">
                  <div className="text-xs text-zinc-400">#{task.id}</div>
                  <h3 className="font-bold text-white text-sm">{task.title}</h3>
                  <p className="text-zinc-300 text-sm">{task.description}</p>
                </div>
                <div className="flex gap-1">
                  <button className="bg-amber-500 hover:bg-amber-400 text-white px-2 py-1 rounded text-sm" title="Editar">
                    <Pencil size={14} />
                  </button>
                  <button className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-sm" title="Deletar">
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pronto */}
        <div 
          className="flex flex-col gap-2 flex-1 bg-zinc-800 p-4 rounded-lg overflow-y-auto"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("done")}
        >
          <h2 className="text-lg font-bold text-amber-500 mb-5">Pronto</h2>

          {doneTasks.map(task => (
            <div 
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(task)}
              className="bg-zinc-700 p-2 rounded-lg shadow text-left cursor-move hover:bg-zinc-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex-1">
                  <div className="text-xs text-zinc-400">#{task.id}</div>
                  <h3 className="font-bold text-white text-sm">{task.title}</h3>
                  <p className="text-zinc-300 text-sm">{task.description}</p>
                </div>
                <div className="flex gap-1">
                  <button className="bg-amber-500 hover:bg-amber-400 text-white px-2 py-1 rounded text-sm" title="Editar">
                    <Pencil size={14} />
                  </button>
                  <button className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-sm" title="Deletar">
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      {/* <div className="w-full bg-black text-zinc-300 text-sm py-2">
        {/* @ts-ignore */}
        {/* <marquee>Desenvolvido por Luiz Becker e Gabriel Wolff</marquee>
      </div> 
      */} 
    </div>
  );
}
