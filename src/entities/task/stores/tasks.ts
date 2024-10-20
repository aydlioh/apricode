import { makeAutoObservable, reaction, toJS } from 'mobx';
import { ITaskInput, ITask } from '../model';

class TaskStore {
  private _tasks: ITask[] = [];
  private _selectedTask: ITask | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
    reaction(
      () => toJS(this._tasks),
      () => this.syncWithLocalStorage()
    );
  }

  addDefaultTask = (parendId: string = '') => {
    this.add({ title: 'Новая задача' }, parendId);
  };

  add = (task: ITaskInput, parendId: string = '') => {
    if (!parendId) {
      this.createTask(task);
    }
    this.createSubtask(task, parendId);
  };

  delete = (id: string) => {
    this.deleteTaskById(id);
  };

  edit = (id: string, task: ITaskInput) => {
    const taskToEdit = this.findTaskById(id);
    if (taskToEdit) {
      taskToEdit.title = task.title;
      taskToEdit.description = task.description;
    }
  };

  toggleComplete = (id: string) => {
    const task = this.findTaskById(id);
    if (task) {
      task.isCompleted = !task.isCompleted;
      this.setTasksComplete(task.subtasks, task.isCompleted);
      this.updateParentTaskComplete(task);
    }
  };

  selectTask = (id: string) => {
    this._selectedTask = this.findTaskById(id) || null;
  };

  private setTasksComplete = (tasks: ITask[], isCompleted: boolean) => {
    for (const task of tasks) {
      task.isCompleted = isCompleted;
      this.setTasksComplete(task.subtasks, isCompleted);
    }
  };

  private updateParentTaskComplete = (task: ITask) => {
    const parentTask = this.findParentTaskBySubtaskId(task.id);
    if (parentTask) {
      parentTask.isCompleted = parentTask.subtasks.every(
        (subtask) => subtask.isCompleted
      );
      this.updateParentTaskComplete(parentTask);
    }
  };

  private createTask = (task: ITaskInput) => {
    const newTask: ITask = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description,
      subtasks: [],
      isCompleted: false,
    };
    this._tasks.push(newTask);
  };

  private createSubtask = (task: ITaskInput, parendId: string) => {
    const parentTask = this.findTaskById(parendId);
    if (parentTask) {
      const newTask: ITask = {
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
        subtasks: [],
        isCompleted: false,
      };
      parentTask.subtasks.push(newTask);
      this.updateParentTaskComplete(newTask);
    }
  };

  private deleteTaskById = (id: string, tasks: ITask[] = this._tasks): boolean => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      return true;
    }
  
    for (const task of tasks) {
      const wasDeleted = this.deleteTaskById(id, task.subtasks);
      if (wasDeleted) {
        return true;
      }
    }
  
    return false;
  };

  private findTaskById = (
    id: string,
    tasks: ITask[] = this._tasks
  ): ITask | undefined => {
    for (const task of tasks) {
      if (task.id === id) return task;
      const subtask = this.findTaskById(id, task.subtasks);
      if (subtask) return subtask;
    }
    return undefined;
  };

  private findParentTaskBySubtaskId = (
    id: string,
    tasks: ITask[] = this._tasks
  ): ITask | undefined => {
    for (const task of tasks) {
      if (task.subtasks.some((subtask) => subtask.id === id)) return task;
      const parentTask = this.findParentTaskBySubtaskId(id, task.subtasks);
      if (parentTask) return parentTask;
    }
    return undefined;
  };

  private syncWithLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem('tasks');
    if (data) {
      this._tasks = JSON.parse(data);
    }
  }

  get tasks() {
    return this._tasks;
  }

  get selectedTask() {
    return this._selectedTask;
  }
}

export const taskStore = new TaskStore();
