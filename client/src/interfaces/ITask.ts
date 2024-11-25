/* eslint-disable no-unused-vars */
import { UseFormReturn } from "./IFormHook";
import { AddLabelFunction } from "./ILabel";

type Status = "pending" | "completed" | "in-progress";

export interface Task {
  id: number;
  title: string;
  status: Status;
  dueDate: string;
  labels: string[];
  description: string;
}

export interface TaskResponse {
  status: number;
  message: string;
  details?: string;
  success: boolean;
  data: { tasks: Array<Task>; totalPages: number };
}

export interface AddTaskFunction {
  (task: Task): Promise<boolean>;
}

export interface UpdateTaskFunction {
  (taskId: number, status: Status): Promise<void>;
}

export interface DeleteTaskFunction {
  (taskId: number): Promise<void>;
}

export interface NewTaskProps {
  isLoading: boolean;
  newTaskForm: UseFormReturn;
  labelOptions: Array<string>;
  handleAddTask: AddTaskFunction;
  handleAddLabel: AddLabelFunction;
}

export interface SetPageFunction {
  (page: number): void;
}

export interface TaskCardProps {
  title?: string;
  status?: Status;
  dueDate?: string;
  description?: string;
  labels?: Array<string>;
  handleRemove: () => void;
  handleUpdate: (status: Status) => void;
}

export interface TaskListProps {
  tasks: Array<Task> | [];
  page: number;
  isLoading: boolean;
  totalPages: number;
  setPage: SetPageFunction;
  handleUpdateTask: UpdateTaskFunction;
  handleDeleteTask: DeleteTaskFunction;
}
