import {
  editTaskModalStore,
  editTaskStore,
  TaskInfo,
  taskStore,
} from '@/entities/task';
import { Button } from '@/shared/ui';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { useParams } from 'react-router-dom';

export const TaskPreview = observer(() => {
  const { id: taskId } = useParams();

  useEffect(() => {
    if (taskId) {
      taskStore.selectTask(taskId);
    }
  }, []);

  const { selectedTask } = taskStore;

  if (!selectedTask) {
    return (
      <div className='flex flex-col h-full justify-center items-center gap-2 my-5'>
        <p className='text-accent text-3xl'>404</p>
        <h3 className="text-2xl text-foreground/60">Задача не выбрана</h3>
      </div>
    );
  }

  const { id, title, description } = selectedTask;

  const handleEditTask = () => {
    editTaskStore.setForm({ id, title, description });
    editTaskModalStore.open();
  };

  return (
    <div>
      <TaskInfo title={title} description={description} />

      <Button
        onClick={handleEditTask}
        className="text-secondary"
        leftContent={<MdModeEdit size={20} />}
      >
        Редактировать
      </Button>
    </div>
  );
});
