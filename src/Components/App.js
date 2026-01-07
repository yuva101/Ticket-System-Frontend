import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./nav/Menu";
import TaskPage from "./TaskPage";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/add" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}
