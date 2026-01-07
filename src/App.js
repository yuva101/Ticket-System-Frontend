import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Components/Menu";
import TaskPage from "./Components/TaskPage";
import TaskList from "./Components/TaskList";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <BrowserRouter>
<center>
  <h1 className="text-5xl font-bold text-red-600">TICKET MANAGEMENT SYSTEM</h1>
</center>

      <Menu />
      <Routes>
        <Route path="/add" element={<TaskPage fetchTasks={fetchTasks} />} />
        <Route path="/list" element={<TaskList tasks={tasks} />} />
        <Route path="/" element={<TaskList tasks={tasks} id={tasks._id} />} />
      </Routes>
    </BrowserRouter>
  );
}
