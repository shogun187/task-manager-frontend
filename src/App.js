import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditTaskPage from './pages/EditTask';
import ErrorPage from './pages/Error';
import TaskDetailPage, {
  loader as taskDetailLoader,
  action as deleteTaskAction,
} from './pages/TaskDetail';
import TasksPage, { loader as tasksLoader } from './pages/Tasks';
import TasksRootLayout from './pages/TasksRoot';
import HomePage from './pages/Home';
import NewTaskPage  from './pages/NewTask';
import RootLayout from './pages/Root';
import { action as manipulateTaskAction } from './components/TaskForm';
import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';
import {action as NewTaskAction} from './components/NewTaskForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'tasks',
        element: <TasksRootLayout />,
        children: [
          {
            index: true,
            element: <TasksPage />,
            loader: tasksLoader,
          },
          {
            path: ':taskId',
            id: 'task-detail',
            loader: taskDetailLoader,
            children: [
              {
                index: true,
                element: <TaskDetailPage />,
                action: deleteTaskAction,
              },
              {
                path: 'edit',
                element: <EditTaskPage />,
                action: manipulateTaskAction
              },
            ],
          },
          {
            path: 'new',
            element: <NewTaskPage />,
            action: NewTaskAction
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
