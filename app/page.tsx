"use client";

import { useState, useEffect } from "react";
import TaskColumn from "./components/TaskColumn";
import AddTaskForm from "./components/AddTaskForm";
import { Task } from "./types/task";
import { createTask, getTasks, stepToStatus, TaskStep } from "./services/taskService";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega as tarefas da API ao iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const apiTasks = await getTasks();
      const convertedTasks: Task[] = apiTasks.map((apiTask) => ({
        id: apiTask.id,
        title: apiTask.title,
        description: apiTask.description,
        status: stepToStatus(apiTask.step),
      }));
      setTasks(convertedTasks);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      alert("Erro ao carregar tarefas. Usando dados locais.");
      // Fallback para dados locais em caso de erro
      setTasks([
        { id: 5, title: "Testes", description: "impossível", status: "todo" },
        {
          id: 6,
          title: "Outra tarefa",
          description: "descrição aqui",
          status: "todo",
        },
        { id: 7, title: "Mais uma", description: "mais detalhes", status: "todo" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (title: string, description: string, step: TaskStep) => {
    try {
      const newApiTask = await createTask({ title, description, step });
      
      // Adiciona a nova tarefa ao estado local
      const newTask: Task = {
        id: newApiTask.id,
        title: newApiTask.title,
        description: newApiTask.description,
        status: stepToStatus(newApiTask.step),
      };
      
      setTasks([...tasks, newTask]);
      alert("Tarefa criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      alert(error instanceof Error ? error.message : "Erro ao criar tarefa");
      throw error;
    }
  };

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
        
        <div className="mt-5">
          <AddTaskForm onAddTask={handleAddTask} />
        </div>

        {isLoading ? (
          <div className="text-white text-xl mt-10">Carregando tarefas...</div>
        ) : (
          <div className="bg-black flex flex-row text-center gap-5 h-2/3 w-3/4 mt-5 p-5 rounded-lg shadow-lg justify-around">
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
        )}
      </div>
    </div>
  );
}
