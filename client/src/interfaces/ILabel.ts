export interface LabelResponse {
  data: {
    labels: Array<string>;
  };
  status: number;
  message: string;
  details?: string;
  success: boolean;
}

export interface AddLabelFunction {
  // eslint-disable-next-line no-unused-vars
  (label: string): Promise<void>;
}
