import Task from "./Task";

const Tasks = ({ tasks, error, isLoading, onDelete, onToggle }) => {
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error fetching tasks.</div>}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))
      ) : (
        <div>No data found</div>
      )}
    </>
  );
};

export default Tasks;
