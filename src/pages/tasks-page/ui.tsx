import { EditTaskModal } from '@/widgets/edit-task-modal';
import { TaskTree } from '@/widgets/task-tree';
import { createPortal } from 'react-dom';

export const TasksPage = () => {
  return (
    <section className="w-1/2 py-4 px-8 overflow-x-auto">
      <TaskTree />
      {createPortal(<EditTaskModal />, document.body)}
    </section>
  );
};
