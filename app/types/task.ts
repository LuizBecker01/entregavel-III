export type TaskStatus = "todo" | "inProgress" | "done";
export type TaskStep = "Para fazer" | "Em andamento" | "Pronto";

export type Task = {
  id: number;
  user?: string;
  title: string;
  description: string;
  status: TaskStatus;
  step?: TaskStep;
};

export const statusToStep: Record<TaskStatus, TaskStep> = {
  todo: "Para fazer",
  inProgress: "Em andamento",
  done: "Pronto",
};

export const stepToStatus: Record<TaskStep, TaskStatus> = {
  "Para fazer": "todo",
  "Em andamento": "inProgress",
  Pronto: "done",
};
