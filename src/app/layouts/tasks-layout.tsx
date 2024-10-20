import { TasksPage } from '@/pages/tasks-page';
import { Header } from '@/widgets/header';
import { Outlet } from 'react-router-dom';

export const TasksLayout = () => {
  return (
    <>
      <Header />
      <main className="flex h-[calc(100svh-100px)] px-2 flex-row container">
        <TasksPage />
        <Outlet />
      </main>
    </>
  );
};
