import { useState, useEffect } from "react";
import { Task, statusToStep, stepToStatus } from "../types/task";
import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStep,
  deleteTask,
  ApiTask,
} from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiTaskToTask = (apiTask: ApiTask): Task => ({
    id: apiTask.id,
    user: apiTask.user,
    title: apiTask.title,
    description: apiTask.description,
    status: stepToStatus[apiTask.step],
    step: apiTask.step,
  });

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiTasks = await getTasks();
      const convertedTasks = apiTasks.map(apiTaskToTask);
      setTasks(convertedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar tarefas");
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (formData: {
    title: string;
    description: string;
    status: "todo" | "inProgress" | "done";
  }) => {
    try {
      setError(null);
      const step = statusToStep[formData.status];
      const newApiTask = await createTask({
        title: formData.title,
        description: formData.description,
        step,
      });

      const newTask = apiTaskToTask(newApiTask);
      setTasks([...tasks, newTask]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar tarefa");
      console.error("Erro ao criar tarefa:", err);
      return false;
    }
  };

  const handleUpdateTask = async (
    taskId: number,
    formData: {
      title: string;
      description: string;
      status: "todo" | "inProgress" | "done";
    }
  ) => {
    try {
      setError(null);
      const step = statusToStep[formData.status];
      const updatedApiTask = await updateTask(taskId, {
        title: formData.title,
        description: formData.description,
        step,
      });

      const updatedTask = apiTaskToTask(updatedApiTask);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar tarefa");
      console.error("Erro ao atualizar tarefa:", err);
      return false;
    }
  };

  const handleUpdateTaskStep = async (
    taskId: number,
    status: "todo" | "inProgress" | "done"
  ) => {
    try {
      const step = statusToStep[status];
      await updateTaskStep(taskId, step);

      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status, step } : task
        )
      );
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao mover tarefa");
      console.error("Erro ao mover tarefa:", err);
      return false;
    }
  };

  const handleDeleteTask = async (task: Task) => {
    if (confirm(`Deseja realmente deletar a tarefa "${task.title}"?`)) {
      try {
        setError(null);
        await deleteTask(task.id);
        setTasks(tasks.filter((t) => t.id !== task.id));
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao deletar tarefa");
        console.error("Erro ao deletar tarefa:", err);
        return false;
      }
    }
    return false;
  };

  return {
    tasks,
    loading,
    error,
    handleCreateTask,
    handleUpdateTask,
    handleUpdateTaskStep,
    handleDeleteTask,
  };
}
