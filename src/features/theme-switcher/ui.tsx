import { FaMoon, FaSun } from 'react-icons/fa';
import { Theme, themeStore } from '@/entities/theme';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

export const ThemeSwitcher = observer(() => {
  const [isOpened, setIsOpened] = useState(false);
  const { theme, setTheme } = themeStore;

  const toggleTheme = (t: Theme) => {
    setTheme(t);
    setIsOpened(!isOpened);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpened(!isOpened)}
        className="flex items-center rounded-full text-foreground/60 duration-200 hover:bg-background/70 bg-background p-3 text-[28px]"
      >
        {theme === 'light' ? <FaSun /> : <FaMoon />}
      </button>
      {isOpened && (
        <div className="absolute right-0 top-full text-[14px] w-[200px] border-2 border-foreground/30 bg-secondary  shadow-md rounded-md">
          <p className="mx-2 pt-2 mb-1 pb-2 text-foreground/80 border-b-2 border-foreground/30">
            Выберите тему
          </p>
          <ul className="p-1 flex flex-col gap-[2px]">
            <li
              onClick={() => toggleTheme('light')}
              className="px-2 py-1 duration-200 rounded-sm hover:bg-foreground/10 cursor-pointer"
            >
              Светлая
            </li>
            <li
              onClick={() => toggleTheme('dark')}
              className="px-2 py-1 duration-200 rounded-sm hover:bg-foreground/10 cursor-pointer"
            >
              Темная
            </li>
            <li
              onClick={() => toggleTheme('system')}
              className="px-2 py-1 duration-200 rounded-sm hover:bg-foreground/10 cursor-pointer"
            >
              Системная
            </li>
          </ul>
        </div>
      )}
    </div>
  );
});
