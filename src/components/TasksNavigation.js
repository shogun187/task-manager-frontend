import { NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './TasksNavigation.module.css';

function TasksNavigation() {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Tasks
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/tasks/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New Task
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default TasksNavigation;
