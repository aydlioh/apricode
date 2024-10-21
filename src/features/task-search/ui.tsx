import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useDebounce } from 'use-debounce';
import { taskStore } from '@/entities/task';
import { Input } from '@/shared/ui';
import { FaSearch } from 'react-icons/fa';

export const TaskSearch = observer(() => {
  const [value, setValue] = useState(taskStore.searchQuery || '');
  const [query] = useDebounce(value, 300);

  useEffect(() => {
    taskStore.search(query);
  }, [query]);

  useEffect(() => {
    if (!taskStore.searchQuery) {
      setValue('');
    }
  }, [taskStore.searchQuery])

  return (
    <Input
      rightContent={
        <button
          type="button"
          className="focus:bg-accent/80 hover:bg-accent/60 rounded-sm p-1 flex justify-center items-center focus:ring-[2px] focus:ring-offset-secondary focus:ring-offset-[2.5px] duration-200 bg-foreground/20 text-background"
        >
          <FaSearch />
        </button>
      }
      value={value}
      onChange={(e) => setValue(e.target.value)}
      containerClassName="max-w-[400px] w-full"
      placeholder="Найти задачу"
    />
  );
});

