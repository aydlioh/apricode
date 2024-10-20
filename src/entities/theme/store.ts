import { makeAutoObservable } from 'mobx';
import { Theme } from './model';

class ThemeStore {
  private _theme: Theme = 'dark';
  

  constructor() {
    makeAutoObservable(this);
    this._theme = (localStorage.getItem('theme') as Theme) || 'system';
  }

  get theme() {
    return this._theme;
  }

  setTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
    this._theme = theme;
  }
}

export const themeStore = new ThemeStore();
