import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ViewTransformer from "./pages/ViewTransformer";
import HomePage from "./pages/HomePage";
import StatusPage from "./pages/StatusPage";
import TableTab from "./components/TableTab";
import CreatePage from "./pages/CreatePage";
import SchedulePage from "./pages/SchedulePage";
import EditPage from "./pages/EditPage";
import ScheduleView from "./pages/ScheduleView";
import CreateUser from "./components/CreateUser";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import AdminRegistration from "./components/AdminRegistration";

function App() {
  const [open, setOpen] = useState(false);
  const [openAdminRegistration, setOpenAdminRegistration] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className="con">
      <Routes>
        <Route path="/" element={<Navigate to={"/login"}></Navigate>} />

        <Route
          path="/login"
          element={<LoginPage setOpen={setOpenAdminRegistration} />}
        />
        <Route
          path="/home"
          element={<HomePage handleUserOpen={handleOpen} />}
        />
        <Route
          path="/home/:id"
          element={<ViewTransformer handleUserOpen={handleOpen} />}
        />
        <Route
          path="/schedule/view/:id"
          element={<ScheduleView handleUserOpen={handleOpen} />}
        />
        <Route
          path="/home/status/:id"
          element={<StatusPage handleUserOpen={handleOpen} />}
        />
        <Route
          path="/create"
          element={<CreatePage handleUserOpen={handleOpen} />}
        />
        <Route
          path="/edit/:id"
          element={<EditPage handleUserOpen={handleOpen} />}
        />
        <Route
          path="/schedule"
          element={<SchedulePage handleUserOpen={handleOpen} />}
        />
        <Route path="/home/edit/:id" element={<h1>edit page</h1>} />
      </Routes>

      <div>
        <CreateUser open={open} setOpen={setOpen} />
      </div>
      <div>
        <AdminRegistration
          open={openAdminRegistration}
          setOpen={setOpenAdminRegistration}
        />
      </div>
    </div>
  );
}

export default App;
