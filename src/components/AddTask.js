import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = ({ handleLoadTasks }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const url = "http://localhost:5000/tasks/create";

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!text && !day) {
      toast("Please add task & day!", { theme: "dark" });
      return;
    }

    try {
      const { data } = await axios({
        url,
        method: "post",
        data: {
          text,
          day,
          reminder,
        },
      });

      console.log(data);
      setIsLoading(false);

      toast("New Task Added", { theme: "dark" });

      setText("");
      setDay("");
      setReminder("");

      handleLoadTasks();
    } catch (error) {
      console.error(error);
      console.log(error);
      toast(
        "An error occurred while submitting the task, please try again later.",
        { theme: "dark" }
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <form className="add-form" onSubmit={handleOnSubmit}>
          <div className="form-control">
            <label>Task</label>
            <input
              type="text"
              placeholder="Add Task"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Day & Time</label>
            <input
              type="text"
              placeholder="Add Day & Time"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
          <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input
              type="checkbox"
              checked={reminder}
              value={reminder}
              onChange={(e) => setReminder(e.currentTarget.checked)}
            />
            <ToastContainer />
          </div>
          <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
      )}
    </>
  );
};

export default AddTask;
