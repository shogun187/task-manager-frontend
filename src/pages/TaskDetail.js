import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import TaskItem from '../components/TaskItem';
import TasksList from '../components/TasksList';
import { getAuthToken } from '../util/auth';

function TaskDetailPage() {
  const { task, tasks } = useRouteLoaderData('task-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={task}>
          {(loadedTask) => <TaskItem task={loadedTask} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={tasks}>
          {(loadedTasks) => <TasksList tasks={loadedTasks} />}
        </Await>
      </Suspense>
    </>
  );
}

export default TaskDetailPage;

async function loadTask(id) {
  const token = getAuthToken()
  const response = await fetch('https://shaugn-task-manager.herokuapp.com/tasks/' + id, {
    method: 'GET',
    headers: {'Authorization' : 'Bearer ' + token}
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected task.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

async function loadTasks() {
  const token = getAuthToken()
  const response = await fetch('https://shaugn-task-manager.herokuapp.com/tasks', {
    method: 'GET',
    headers: {'Authorization' : 'Bearer ' + token}
  });

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch tasks.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch tasks.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch tasks.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function loader({ request, params }) {
  const id = params.taskId;

  return defer({
    task: await loadTask(id),
    tasks: loadTasks(),
  });
}

export async function action({ params, request }) {
  const taskId = params.taskId;

  const token = getAuthToken();
  const response = await fetch('https://shaugn-task-manager.herokuapp.com/tasks/' + taskId, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete task.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/tasks');
}
