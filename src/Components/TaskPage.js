import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/tasks";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [assignee, setAssignee] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const submitTask = async () => {
    if (title.length < 5) return setError("Title must be minimum 5 chars");
    if (description.length < 10)
      return setError("Description must be minimum 10 chars");
    if (!status) return setError("Status is required");
    if (!assignee) return setError("Assignee is required");

    setError("");

    if (editId) {
      await axios.put(`${API}/${editId}`, {
        title,
        description,
        status,
        assignee,
      });
    } else {
      await axios.post(API, { title, description, status, assignee });
    }

    resetForm();
    fetchTasks();
  };

  const editTask = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setAssignee(task.assignee);
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setStatus("");
    setAssignee("");
  };

  const renderColumn = (type) =>
    tasks
      .filter((t) => t.status === type)
      .map((t) => (
        <div key={t._id} className="bg-white p-3 shadow mb-3">
          <h3 className="font-bold">{t.title}</h3>
          <p>{t.description}</p>
          <p className="text-sm">Assigned: {t.assignee}</p>
          <button
            className="bg-green-500 text-white px-2 py-1 mr-2"
            onClick={() => editTask(t)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1"
            onClick={() => deleteTask(t._id)}
          >
            Delete
          </button>
        </div>
      ));

  return (
    <div className="p-5">
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-gray-100 p-4 mb-5">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Todo">Todo</option>
          <option value="InProgress">InProgress</option>
          <option value="Done">Done</option>
        </select>

        <select
          className="border p-2 w-full mb-2"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          <option value="">Select Assignee</option>
          <option value="Delegate1">Delegate1</option>
          <option value="Delegate2">Delegate2</option>
          <option value="Delegate3">Delegate3</option>
          <option value="Delegate4">Delegate4</option>
        </select>

        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={submitTask}
        >
          {editId ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Mobile List */}
      <div className="block md:hidden">
        {tasks.map((t) => (
          <div key={t._id} className="bg-white p-3 shadow mb-3">
            <h3 className="font-bold">{t.title}</h3>
            <p>{t.description}</p>
            <p>Status: {t.status}</p>
            <button
              onClick={() => editTask(t)}
              className="bg-green-500 text-white px-2 py-1 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(t._id)}
              className="bg-red-500 text-white px-2 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Desktop Kanban */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        <div>
          <h2 className="font-bold mb-2">Todo</h2>
          {renderColumn("Todo")}
        </div>
        <div>
          <h2 className="font-bold mb-2">InProgress</h2>
          {renderColumn("InProgress")}
        </div>
        <div>
          <h2 className="font-bold mb-2">Done</h2>
          {renderColumn("Done")}
        </div>
      </div>
    </div>
  );
}
