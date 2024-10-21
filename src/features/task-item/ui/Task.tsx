import {
  editTaskModalStore,
  editTaskStore,
  ITask,
  taskStore,
  TaskTitle,
} from '@/entities/task';
import { Checkbox } from '@/shared/ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { TaskTools } from './TaskTools';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

export const Task = observer(
  ({ id, title, description, isCompleted, isOpened, subtasks }: ITask) => {
    const taskRef = useRef<HTMLDivElement | null>(null);
    const [isToolsVisible, setIsToolsVisible] = useState<boolean>(false);
    const hasSubtasks = subtasks.length > 0;
    const navigate = useNavigate();

    const handleTaskClick = () => {
      navigate(`/tasks/${id}`);
      taskStore.selectTask(id);
      if (isOpened && isToolsVisible) {
        taskStore.toggleOpen(id);
      } else if (!isOpened) {
        taskStore.toggleOpen(id);
      }
      setIsToolsVisible(prev => !prev);
    };

    const handleCreateSubtask = () => {
      taskStore.addDefaultTask(id);
      taskStore.search('');
    };

    const handleEditTask = () => {
      editTaskStore.setForm({ id, title, description });
      editTaskModalStore.open();
    };

    const handleDeleteTask = () => {
      taskStore.delete(id);
      taskStore.selectTask('');
    };

    const handleCheckboxChange = () => {
      if (!isOpened && hasSubtasks) {
        taskStore.toggleOpen(id);
      }
      taskStore.toggleComplete(id);
    };

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          taskRef.current &&
          !taskRef.current.contains(event.target as Node)
        ) {
          setIsToolsVisible(false);
        }
      },
      [setIsToolsVisible]
    );

    useEffect(() => {
      if (isToolsVisible) {
        document.addEventListener('click', handleClickOutside);
      }

      return () => {
        if (isToolsVisible) {
          document.removeEventListener('click', handleClickOutside);
        }
      };
    }, [isToolsVisible, handleClickOutside]);

    return (
      <div
        ref={taskRef}
        onClick={handleTaskClick}
        className={clsx(
          'ml-1 duration-150 cursor-pointer rounded-[3px] flex flex-row items-center justify-between pl-2 pr-3 py-1',
          taskStore.selectedTask?.id === id
            ? 'bg-foreground/15 hover:bg-foreground/15'
            : 'hover:bg-foreground/5'
        )}
      >
        <div className="flex gap-2 items-center w-full">
          <ArrowIcon isOpen={isOpened} />
          <Checkbox checked={isCompleted} onChange={handleCheckboxChange} />
          <TaskTitle title={title} />
        </div>
        <div>
          {isToolsVisible && (
            <TaskTools
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onCreateSubtask={handleCreateSubtask}
            />
          )}
        </div>
      </div>
    );
  }
);

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <IoIosArrowForward
    className={clsx('duration-200', isOpen ? 'rotate-90' : 'rotate-0')}
  />
);
