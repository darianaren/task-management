import { UseFormReturn } from "./IFormHook";
import { AddLabelFunction } from "./ILabel";

export interface Task {
  title: string;
  dueDate: string;
  labels: string[];
  description: string;
  status: "pending" | "completed" | "in-progress";
}

export interface TaskResponse {
  data: Task;
  status: number;
  message: string;
  details?: string;
  success: boolean;
}

export interface AddTaskFunction {
  // eslint-disable-next-line no-unused-vars
  (task: Task): Promise<boolean>;
}

export interface NewTaskProps {
  isLoading: boolean;
  newTaskForm: UseFormReturn;
  labelOptions: Array<string>;
  handleAddTask: AddTaskFunction;
  handleAddLabel: AddLabelFunction;
}
