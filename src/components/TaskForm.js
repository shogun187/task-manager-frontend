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

function TaskForm({data}) {
  //const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
      <Form method='patch' className={classes.form}>
        <p>
          <label htmlFor="description">Description</label>
          <input
              id="description"
              type="text"
              name="description"
              defaultValue={data.task.description}
              required
          />
        </p>
        <div className={classes.check}>
          <label htmlFor="completed">Completed?</label>
          <input
              type='checkbox'
              id='completed'
              name='completed'
              value='true'
              defaultChecked={data.task.completed}

          />
        </div>
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

export async function action({request, params}) {

  const data = await request.formData();

  console.log('params', params)

  let taskData;

  console.log(data.get('completed'))

  if (data.get('completed') === 'true') {
    taskData = {
      description: data.get('description'),
      completed: 'true'
    }
  } else {
    taskData = {
      description: data.get('description'),
      completed: 'false'
    }
  }

  console.log(taskData)

  let url = 'https://shaugn-task-manager.herokuapp.com/tasks/' + params.taskId;


  const token = getAuthToken();
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(taskData),
  });

  if (response.status === 400) {
    console.log(response)
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save task.' }, { status: 500 });
  }

  return redirect('/tasks');
}

