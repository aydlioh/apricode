import { ITask, taskStore } from '@/entities/task';
import { Task } from './Task';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

export const TaskItem = observer((props: ITask) => {
  const [areSubtasksOpen, setAreSubtasksOpen] = useState<boolean>(false);

  const toggleSubtaskOpen = () => {
    setAreSubtasksOpen((prev) => !prev);
  };

  const handleCreateSubtask = () => {
    taskStore.addDefaultTask(props.id);
  };

  const renderSubtasks = () => {
    if (props.subtasks.length > 0) {
      return (
        <ul
          className={clsx(
            'ml-[19px] mt-1 border-l-[2px] flex flex-col gap-1',
            taskStore.selectedTask?.id === props.id
              ? 'border-l-accent'
              : 'border-l-foreground/20'
          )}
        >
          {props.subtasks.map((subtask) => (
            <TaskItem key={subtask.id} {...subtask} />
          ))}
        </ul>
      );
    }

    return (
      <div className="ml-[19px]">
        <button
          onClick={handleCreateSubtask}
          className="duration-200 text-foreground/30 hover:text-accent/80 active:text-accent ml-[22px] py-0.5"
        >
          + Добавить подзадачу
        </button>
      </div>
    );
  };

  return (
    <li className="min-w-[250px]">
      <Task {...props} isOpen={areSubtasksOpen} onOpen={toggleSubtaskOpen} />
      {areSubtasksOpen && renderSubtasks()}
    </li>
  );
});
