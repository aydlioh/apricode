import { EditTaskModal } from '@/widgets/edit-task-modal';
import { TaskTree } from '@/widgets/task-tree';
import { createPortal } from 'react-dom';

export const TasksPage = () => {
  return (
    <section className="md:w-1/2 w-full py-4 lg:px-8 px-1">
      <TaskTree />
      {createPortal(<EditTaskModal />, document.body)}
    </section>
  );
};
