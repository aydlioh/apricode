import { TaskPreviewPage } from '@/pages/task-preview-page';
import { TasksLayout } from './layouts/tasks-layout';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<TasksLayout />}>
          <Route path="/tasks/:id" element={<TaskPreviewPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  );
};
