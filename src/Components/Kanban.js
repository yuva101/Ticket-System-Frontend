export default function Kanban({ tasks }) {
  const statuses = ["Todo", "InProgress", "Done"];
  return (
    <div className="hidden md:flex gap-4">
      {statuses.map(status => (
        <div key={status} className="flex-1 border p-2 rounded">
          <h2 className="font-bold mb-2">{status}</h2>
          {tasks.filter(t => t.status === status).map((task, i) => (
            <div key={i} className="border p-2 mb-2 rounded bg-gray-50">
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Assignee: {task.assignee}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
