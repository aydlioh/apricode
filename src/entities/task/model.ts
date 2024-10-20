export interface ITask {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isOpened: boolean;
  subtasks: ITask[];
}

export interface ITaskInput {
  title: string;
  description?: string;
}