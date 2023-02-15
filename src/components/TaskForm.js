import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect
} from 'react-router-dom';

import { getAuthToken } from '../util/auth';
import classes from './TaskForm.module.css';

function TaskForm({ method, task }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.error && <p>Error</p>}
      <p>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          required
          defaultValue={task ? task.description : ''}
        />
      </p>
      <p>
        <label htmlFor="completed">Completed</label>
        <textarea
          id="completed"
          name="completed"
          rows="5"
          required
          defaultValue={task ? task.completed : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default TaskForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const taskData = {
    description: data.get('description'),
    completed: data.get('completed')
  };

  let url = 'https://shaugn-task-manager.herokuapp.com/tasks';

  if (method === 'PATCH') {
    const taskId = params.taskId;
    url = 'https://shaugn-task-manager.herokuapp.com/tasks/' + taskId;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(taskData),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save task.' }, { status: 500 });
  }

  return redirect('/tasks');
}

