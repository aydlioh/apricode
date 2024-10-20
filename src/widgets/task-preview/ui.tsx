import { editTaskModalStore, editTaskStore, TaskInfo, taskStore } from '@/entities/task';
import { Button } from '@/shared/ui';
import { observer } from 'mobx-react-lite';
import { MdModeEdit } from 'react-icons/md';
import { Navigate } from 'react-router-dom';

export const TaskPreview = observer(() => {
  const { selectedTask } = taskStore;

  if (!selectedTask) {
    return <Navigate to="/tasks" />;
  }

  const { id, title, description } = selectedTask;

  if (!id || !title) {
    return <Navigate to="/tasks" />;
  }

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
