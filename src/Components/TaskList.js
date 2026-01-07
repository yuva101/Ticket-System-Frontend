import axios from "axios";
import { useEffect, useState } from "react";

const API = "http://localhost:5000/tasks";

export default function TaskList() {

  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    assignee: ""
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const editTask = (task) => {
    setEditId(task._id);
    setForm(task);
    console.log(task._id)
  };

  const updateTask = async () => {
    await axios.put(`${API}/${editId}`, form);
    setEditId(null);
    fetchTasks();
  };

  return (
    <div className="p-6">

      {/* EDIT FORM */}
      {editId && (
        <div className="bg-gray-100 p-4 mb-4">
          <input className="border p-2 w-full mb-2"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <textarea className="border p-2 w-full mb-2"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

          <input className="border p-2 w-full mb-2"
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
          />

          <input className="border p-2 w-full mb-2"
            value={form.assignee}
            onChange={e => setForm({ ...form, assignee: e.target.value })}
          />

          <button
            className="bg-blue-600 text-white px-4 py-2"
            onClick={updateTask}
          >
            Update Task
          </button>
        </div>
      )}

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2 m-2 ">Title</th>
            <th className="border p-2 m-2 ">Description</th>
            <th className="border p-2 m-2 ">Status</th>
            <th className="border p-2 m-2 ">Assignee</th>
            <th className="border p-2 m-2 ">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(t => (
            <tr key={t._id}>
              <td className="border p-2">{t.title}</td>
              <td className="border p-2">{t.description}</td>
              <td className="border p-2">{t.status}</td>
              <td className="border p-2">{t.assignee}</td>
              <td className="border p-2">
                <button
                  onClick={() => editTask(t)}
                  className="bg-green-600 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(t._id)}
                  className="bg-red-600 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
