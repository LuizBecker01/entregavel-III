"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { TaskStep } from "../services/taskService";

interface AddTaskFormProps {
  onAddTask: (title: string, description: string, step: TaskStep) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState<TaskStep>("Para fazer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddTask(title, description, step);
      
      // Limpa o formulário
      setTitle("");
      setDescription("");
      setStep("Para fazer");
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setStep("Para fazer");
    setIsOpen(false);
  };

  return (
    <div className="mb-5">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
        >
          <Plus size={20} />
          Nova Tarefa
        </button>
      ) : (
        <div className="bg-zinc-800 p-6 rounded-lg shadow-xl max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Nova Tarefa</h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white transition-colors"
              type="button"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Título *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Digite o título da tarefa"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Descrição *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Digite a descrição da tarefa"
                required
              />
            </div>

            <div>
              <label htmlFor="step" className="block text-sm font-medium text-gray-300 mb-2">
                Status *
              </label>
              <select
                id="step"
                value={step}
                onChange={(e) => setStep(e.target.value as TaskStep)}
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="Para fazer">Para fazer</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Pronto">Pronto</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold transition-colors"
              >
                {isSubmitting ? "Criando..." : "Criar Tarefa"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md font-semibold transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
