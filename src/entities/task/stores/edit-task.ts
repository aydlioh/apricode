import { makeAutoObservable } from 'mobx';
import { taskStore } from './tasks';

class EditTaskStore {
  private id: string = '';
  private _title: string = '';
  private _description: string = '';
  private sending: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isSending() {
    return this.sending;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  setForm = ({
    id,
    title,
    description = '',
  }: {
    id: string;
    title: string;
    description?: string;
  }) => {
    this.id = id;
    this._title = title;
    this._description = description;
  };

  handleTitleChange = (value: string) => {
    this._title = value;
  };

  handleDescriptionChange = (value: string) => {
    this._description = value;
  };

  handleSubmit = () => {
    this.sending = true;
    taskStore.edit(this.id, {
      title: this._title,
      description: this._description,
    });
    this.sending = false;
  };
}

export const editTaskStore = new EditTaskStore();
