import TaskForm from '../components/TaskForm';

function NewTaskPage() {
  console.log('You made it to NewTaskPage')
  return <TaskForm method="post" />;
}

export default NewTaskPage;

