import { Routes, Route } from "react-router-dom";
import Home from "./pages/MainTable";
import Kanban from "./pages/Kanban";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kanban" element={<Kanban />} />
    </Routes>
  );
};

export default App;
