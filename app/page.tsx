"use client";

import { useState } from "react";
import Header from "./header/page";
import SearchBar from "./components/SearchBar";
import TaskBoard from "./components/TaskBoard";
import TaskModal from "./components/TaskModal";
import { useTasks } from "./hooks/useTasks";
import { Task } from "./types/task";

export default function Home() {
  const {
    tasks,
    loading,
    error,
    handleCreateTask,
    handleUpdateTask,
    handleUpdateTaskStep,
    handleDeleteTask,
  } = useTasks();

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo" as "todo" | "inProgress" | "done",
  });

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (status: "todo" | "inProgress" | "done") => {
    if (draggedTask) {
      await handleUpdateTaskStep(draggedTask.id, status);
      setDraggedTask(null);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setShowEditModal(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmitCreate = async () => {
    const success = await handleCreateTask(formData);
    if (success) {
      setShowCreateModal(false);
      setFormData({ title: "", description: "", status: "todo" });
    }
  };

  const handleSubmitEdit = async () => {
    if (!editingTask) return;
    const success = await handleUpdateTask(editingTask.id, formData);
    if (success) {
      setShowEditModal(false);
      setEditingTask(null);
      setFormData({ title: "", description: "", status: "todo" });
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setEditingTask(null);
    setFormData({ title: "", description: "", status: "todo" });
  };

  const filterTasks = (taskList: Task[]) => {
    if (!searchQuery.trim()) return taskList;
    const query = searchQuery.toLowerCase();
    return taskList.filter(
      (task) =>
        task.id.toString().includes(query) ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    );
  };

  const todoTasks = filterTasks(tasks.filter((task) => task.status === "todo"));
  const inProgressTasks = filterTasks(
    tasks.filter((task) => task.status === "inProgress")
  );
  const doneTasks = filterTasks(tasks.filter((task) => task.status === "done"));

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-zinc-50 dark:bg-amber-600">
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="text-2xl font-bold text-black">
            Carregando tarefas...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-50 font-sans dark:bg-amber-600">
      <Header onCreateTask={() => setShowCreateModal(true)} />
      <div className="flex flex-col flex-1 items-center p-4 gap-4">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <TaskBoard
          todoTasks={todoTasks}
          inProgressTasks={inProgressTasks}
          doneTasks={doneTasks}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onEdit={handleEdit}
          onDelete={handleDeleteTask}
        />
      </div>

      <TaskModal
        isOpen={showCreateModal}
        mode="create"
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmitCreate}
        onClose={handleCloseModal}
      />

      <TaskModal
        isOpen={showEditModal}
        mode="edit"
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmitEdit}
        onClose={handleCloseModal}
      />
    </div>
  );
}
