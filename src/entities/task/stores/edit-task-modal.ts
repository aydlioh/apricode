import { makeAutoObservable } from 'mobx';

class EditTaskModalStore {
  private isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  open = () => {
    this.isOpen = true;
  }

  close = () => {
    this.isOpen = false;
  }

  get isOpened() {
    return this.isOpen;
  }
}

export const editTaskModalStore = new EditTaskModalStore();
