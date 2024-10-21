import { taskStore } from '@/entities/task';
import { TaskItem } from '@/features/task-item';
import { TaskSearch } from '@/features/task-search';
import { observer } from 'mobx-react-lite';

export const TaskTree = observer(() => {
  return (
    <div className="my-5 lg:px-8 px-4 w-full">
      <TaskSearch />
      <ul className="flex flex-col gap-1 mt-5 overflow-x-auto">
        {taskStore.tasks.map((parentTask) => (
          <TaskItem key={parentTask.id} {...parentTask} />
        ))}
        <div>
          <button
            onClick={() => taskStore.addDefaultTask()}
            className="duration-200 text-foreground/30  hover:text-accent/80 active:text-accent ml-[18px] py-0.5"
          >
            + Добавить задачу
          </button>
        </div>
      </ul>
    </div>
  );
});
