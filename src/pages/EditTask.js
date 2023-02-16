import { useRouteLoaderData } from 'react-router-dom';

import TaskForm from '../components/TaskForm';

function EditTaskPage() {
  const data = useRouteLoaderData('task-detail');

  return <TaskForm method="patch" data={data} />;
}

export default EditTaskPage;
