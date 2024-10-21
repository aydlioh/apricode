import { TasksPage } from '@/pages/tasks-page';
import { Header } from '@/widgets/header';
import { Outlet } from 'react-router-dom';

export const TasksLayout = () => {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100svh-100px)] px-2 md:flex-row flex-col container md:py-0 py-2">
        <TasksPage />
        <Outlet />
      </main>
    </>
  );
};
