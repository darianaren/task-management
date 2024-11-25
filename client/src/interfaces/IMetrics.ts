export interface MetricsProps {
  total?: number;
  pending?: number;
  completed?: number;
  inProgress?: number;
  isLoading?: boolean;
}

export interface MetricsResponse {
  data: {
    total: number;
    pending: number;
    completed: number;
    inProgress: number;
  };
  status: number;
  message: string;
  details?: string;
  success: boolean;
}
