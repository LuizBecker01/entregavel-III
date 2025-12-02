interface TaskModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  formData: {
    title: string;
    description: string;
    status: "todo" | "inProgress" | "done";
  };
  onFormChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function TaskModal({
  isOpen,
  mode,
  formData,
  onFormChange,
  onSubmit,
  onClose,
}: TaskModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {mode === "create" ? "Criar Nova Tarefa" : "Editar Tarefa"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => onFormChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              placeholder="Digite o título"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => onFormChange("description", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              placeholder="Digite a descrição"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => onFormChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="todo">Para fazer</option>
              <option value="inProgress">Em andamento</option>
              <option value="done">Pronto</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onSubmit}
            className={`flex-1 ${
              mode === "create"
                ? "bg-green-600 hover:bg-green-500"
                : "bg-amber-600 hover:bg-amber-500"
            } text-white px-4 py-2 rounded-md font-bold`}
          >
            {mode === "create" ? "Criar" : "Salvar"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md font-bold"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
