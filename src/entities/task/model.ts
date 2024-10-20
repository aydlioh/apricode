export interface ITask {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  subtasks: ITask[];
}

export interface ITaskInput {
  title: string;
  description?: string;
}