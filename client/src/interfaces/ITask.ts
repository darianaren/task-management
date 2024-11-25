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
  data: Array<Task>;
  status: number;
  message: string;
  details?: string;
  success: boolean;
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
  setPage: AddTaskFunction;
  handleUpdateTask: UpdateTaskFunction;
  handleDeleteTask: DeleteTaskFunction;
}
