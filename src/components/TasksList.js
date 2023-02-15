// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

import classes from './TasksList.module.css';

function TasksList({tasks}) {
  // const tasks = useLoaderData();

  return (
    <div className={classes.tasks}>
      <h1>All Tasks</h1>
      <ul className={classes.list}>
        {tasks.map((task) => (
          <li key={task._id} className={classes.item}>
            <Link to={`/tasks/${task._id}`}>
              <div className={classes.content}>
                <h2>{`${task.description} (${task.completed ? 'Done' : 'Not Done'})`}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TasksList;
