import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [assignee, setAssignee] = useState("Delegate1");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length < 5 || description.length < 10) {
      alert("Title min 5, description min 10");
      return;
    }
    addTask({ title, description, status, assignee });
    setTitle(""); setDescription(""); setStatus("Todo"); setAssignee("Delegate1");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border mb-4 rounded">
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full mb-2" />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 w-full mb-2" />
      <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 w-full mb-2">
        <option>Todo</option>
        <option>InProgress</option>
        <option>Done</option>
      </select>
      <select value={assignee} onChange={e => setAssignee(e.target.value)} className="border p-2 w-full mb-2">
        <option>Delegate1</option>
        <option>Delegate2</option>
        <option>Delegate3</option>
        <option>Delegate4</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  );
}
