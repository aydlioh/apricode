import { makeAutoObservable, reaction, toJS } from 'mobx';
import { ITaskInput, ITask } from '../model';

class TaskStore {
  private _tasks: ITask[] = [];
  private _selectedTask: ITask | null = null;
  private _searchTitle: string = '';

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
    this.loadQueryParams();
    reaction(
      () => toJS(this._tasks),
      () => this.syncWithLocalStorage()
    );
  }

  addDefaultTask = (parendId: string = '') => {
    this.add({}, parendId);
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
      taskToEdit.title = task.title ?? '';
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

  toggleOpen = (id: string) => {
    const task = this.findTaskById(id);
    if (task) {
      task.isOpened = !task.isOpened;
    }
  };

  selectTask = (id: string) => {
    this._selectedTask = this.findTaskById(id) || null;
    this.syncWithQueryParams()
  };

  isParentTask = (parentId: string, childId: string): boolean => {
    const parentTask = this.findTaskById(parentId);
    if (!parentTask) {
      return false;
    }

    const findTask = (tasks: ITask[]): boolean => {
      for (const task of tasks) {
        if (task.id === childId) {
          return true;
        }
        if (findTask(task.subtasks)) {
          return true;
        }
      }
      return false;
    };

    return findTask(parentTask.subtasks);
  };

  search = (query: string) => {
    this._searchTitle = query;
    this.syncWithQueryParams()
  };

  private searchByQuery = (tasks: ITask[], query: string): ITask[] => {
    const result: ITask[] = [];

    for (const task of tasks) {
      const subtasksResult = this.searchByQuery(task.subtasks, query);
      if (this.includesQuery(task.title, query) || subtasksResult.length) {
        result.push({
          ...task,
          subtasks: subtasksResult,
        });
      }
    }

    return result;
  };

  private includesQuery = (text: string, query: string): boolean => {
    return text.toLowerCase().includes(query.toLowerCase());
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
      title: task.title ?? '',
      description: task.description,
      subtasks: [],
      isCompleted: false,
      isOpened: true,
    };
    this._tasks.push(newTask);
  };

  private createSubtask = (task: ITaskInput, parendId: string) => {
    const parentTask = this.findTaskById(parendId);
    if (parentTask) {
      const newTask: ITask = {
        id: crypto.randomUUID(),
        title: task.title ?? '',
        description: task.description,
        subtasks: [],
        isCompleted: false,
        isOpened: false,
      };
      parentTask.subtasks.push(newTask);
      this.updateParentTaskComplete(newTask);
    }
  };

  private deleteTaskById = (
    id: string,
    tasks: ITask[] = this._tasks
  ): boolean => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
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
    localStorage.setItem('tasks', JSON.stringify(this._tasks));
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem('tasks');
    if (data) {
      this._tasks = JSON.parse(data);
    }
  }

  private syncWithQueryParams() {
    const params = new URLSearchParams(location.search);
    if (this._searchTitle) {
      params.set('search', this._searchTitle);
    } else {
      params.delete('search');
    }
    window.history.replaceState({}, '', `${location.pathname}?${params}`);
  }

  private loadQueryParams() {
    this._searchTitle =
      new URLSearchParams(location.search).get('search') || '';
  }

  get tasks() {
    if (this._searchTitle) {
      return this.searchByQuery(this._tasks, this._searchTitle);
    }

    return this._tasks;
  }

  get selectedTask() {
    return this._selectedTask;
  }

  get searchQuery() {
    return this._searchTitle;
  }
}

export const taskStore = new TaskStore();
