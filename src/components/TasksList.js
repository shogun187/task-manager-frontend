// import { useLoaderData } from 'react-router-dom';
import {Link} from 'react-router-dom';

import classes from './TasksList.module.css';

function TasksList({tasks}) {

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
        <div className={classes.tasks}>
            <h1>All Tasks</h1>
            <ul className={classes.list}>
                {tasks.sort(comparator).map((task) => (
                    <li key={task._id} className={classes.item}>
                        <Link to={`/tasks/${task._id}`}>
                            <div className={classes.content}>
                                {task.completed ? <h2><s>{task.description} (Done)</s></h2> : <h2>{task.description} (Not Done)</h2>}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TasksList;
