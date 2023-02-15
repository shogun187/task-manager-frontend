import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom';

import classes from './TaskItem.module.css';

function TaskItem({ task }) {
  console.log(task)
  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className={classes.task}>
      <h1>{task.description}</h1>
      <p>{task.completed}</p>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default TaskItem;
