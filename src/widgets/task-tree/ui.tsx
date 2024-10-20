import { taskStore } from '@/entities/task';
import { TaskItem } from '@/features/task-item';
import { observer } from 'mobx-react-lite';

export const TaskTree = observer(() => {
  return (
    <div className="my-5 px-10">
      <ul className="flex flex-col gap-1">
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
