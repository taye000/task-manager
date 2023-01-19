import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder && "reminder"}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <div className="task1">
        <p>{task.day}</p>
        <h3>
          {task.text}{" "}
          <FaTimes
            style={{
              justifyContent: "space-between",
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => onDelete(task.id)}
          />
        </h3>
      </div>
    </div>
  );
};

export default Task;
