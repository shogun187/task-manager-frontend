import { useRouteLoaderData } from 'react-router-dom';

import TaskForm from '../components/TaskForm';

function EditTaskPage() {
  console.log('You made it to EditTaskPage')
  const data = useRouteLoaderData('task-detail');


  return <TaskForm method="patch" task={data} />;
}

export default EditTaskPage;
