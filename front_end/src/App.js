import { Route, Routes } from "react-router-dom";
import "./App.css";
import ViewTransformer from "./pages/ViewTransformer";
import HomePage from "./pages/HomePage";
import StatusPage from "./pages/StatusPage";
import TableTab from "./components/TableTab";
import CreatePage from "./pages/CreatePage";
import SchedulePage from "./pages/SchedulePage";

function App() {
  return (
    <div className="con">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:id" element={<ViewTransformer />} />
        <Route path="/home/status/:id" element={<StatusPage />} />
        <Route path="/home/tab" element={<TableTab />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/schedule" element={<SchedulePage />} />

        <Route path="/home/edit/:id" element={<h1>edit page</h1>} />
      </Routes>
    </div>
  );
}

export default App;
