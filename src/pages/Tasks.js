import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import TasksList from '../components/TasksList';
import {getAuthToken} from "../util/auth";

function TasksPage() {
  const { tasks } = useLoaderData();
  function comparator(first, second) {
      if (first.completed && !second.completed) {
          return 1
      }
      if (!first.completed && second.completed) {
          return -1
      }
      return 0
  }

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={tasks}>
        {(loadedTasks) => <TasksList tasks={loadedTasks.sort(comparator)} />}
      </Await>
    </Suspense>
  );
}

export default TasksPage;

async function loadTasks() {
  const token = getAuthToken()
  const response = await fetch('https://shaugn-task-manager.herokuapp.com/tasks',
      {
        method: 'GET',
        headers: {
          'Authorization' : "Bearer " + token}
      })

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
    return resData
  }
}

export function loader() {
  return defer({
    tasks: loadTasks(),
  });
}
