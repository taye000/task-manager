import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setreminder] = useState(false);
  const url = "http://localhost:5000/tasks/create";

  useEffect(() => {
    const data = {
      task: text,
      day: day,
      reminder: reminder,
    };
    axios.post(url, data).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }, [text, day, reminder]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      toast("Please add text!", { theme: "dark" });
      return;
    }
    onAdd({ text, day, reminder });
    setText("");
    setDay("");
    setreminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
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
          onChange={(e) => setreminder(e.currentTarget.checked)}
        />
        <ToastContainer />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
