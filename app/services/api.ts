const API_BASE_URL = "https://pacaro-tarefas.netlify.app/api/luiz";

export type TaskStep = "Para fazer" | "Em andamento" | "Pronto";

export interface ApiTask {
  id: number;
  user: string;
  title: string;
  description: string;
  step: TaskStep;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  step: TaskStep;
}

export interface UpdateTaskDto {
  title: string;
  description: string;
  step: TaskStep;
}

export async function getTasks(): Promise<ApiTask[]> {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Erro ao buscar tarefas");
  }
  return response.json();
}

export async function createTask(task: CreateTaskDto): Promise<ApiTask> {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao criar tarefa");
  }

  return response.json();
}

export async function updateTask(
  id: number,
  task: UpdateTaskDto
): Promise<ApiTask> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao atualizar tarefa");
  }

  return response.json();
}

export async function updateTaskStep(
  id: number,
  step: TaskStep
): Promise<ApiTask> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/update-step`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ step }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao atualizar step da tarefa");
  }

  return response.json();
}

export async function deleteTask(id: number): Promise<ApiTask> {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erro ao deletar tarefa");
  }

  return response.json();
}
