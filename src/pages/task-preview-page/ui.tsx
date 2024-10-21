import { TaskPreview } from '@/widgets/task-preview';

export const TaskPreviewPage = () => {
  return (
    <section className="bg-secondary rounded-md md:w-1/2 w-full py-4 lg:px-8 px-6 md:min-h-auto min-h-[50svh]">
      <TaskPreview />
    </section>
  );
};
