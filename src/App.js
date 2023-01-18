import { toast } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import axios from "axios";

function App() {
  const [showAddTask, setshowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleLoadTasks();
  }, []);

  // fetch tasks
  const handleLoadTasks = () => {
    const url = "http://localhost:5000/tasks";

    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setTasks(response.data.allTasks || []);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  //delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast("Task Deleted", { theme: "dark" });
  };

  //toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
    toast("Task Status Changed", { theme: "dark" });
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setshowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                {showAddTask && <AddTask handleLoadTasks={handleLoadTasks} />}
                {tasks.length > 0 ? (
                  <Tasks
                    isLoading={isLoading}
                    tasks={tasks}
                    error={error}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "It's lonely in here, add some tasks."
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
