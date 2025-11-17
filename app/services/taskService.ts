import axios from 'axios';

const API_BASE_URL = 'https://pacaro-tarefas.netlify.app/api';
const USER = 'luiz';

export type TaskStep = 'Para fazer' | 'Em andamento' | 'Pronto';

export interface CreateTaskDTO {
  title: string;
  description: string;
  step: TaskStep;
}

export interface ApiTask {
  id: number;
  title: string;
  description: string;
  step: TaskStep;
  user: string;
}

// Converte o status local para o step da API
export const statusToStep = (status: 'todo' | 'inProgress' | 'done'): TaskStep => {
  const mapping: Record<'todo' | 'inProgress' | 'done', TaskStep> = {
    todo: 'Para fazer',
    inProgress: 'Em andamento',
    done: 'Pronto',
  };
  return mapping[status];
};

// Converte o step da API para o status local
export const stepToStatus = (step: TaskStep): 'todo' | 'inProgress' | 'done' => {
  const mapping: Record<TaskStep, 'todo' | 'inProgress' | 'done'> = {
    'Para fazer': 'todo',
    'Em andamento': 'inProgress',
    'Pronto': 'done',
  };
  return mapping[step];
};

// Cria uma nova tarefa
export const createTask = async (taskData: CreateTaskDTO): Promise<ApiTask> => {
  try {
    const response = await axios.post<ApiTask>(
      `${API_BASE_URL}/${USER}/tasks`,
      taskData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        throw new Error('Dados inválidos. Verifique os campos obrigatórios.');
      }
      throw new Error(error.response?.data?.message || 'Erro ao criar tarefa');
    }
    throw new Error('Erro ao criar tarefa');
  }
};

// Busca todas as tarefas do usuário
export const getTasks = async (): Promise<ApiTask[]> => {
  try {
    const response = await axios.get<ApiTask[]>(`${API_BASE_URL}/${USER}/tasks`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar tarefas');
    }
    throw new Error('Erro ao buscar tarefas');
  }
};
