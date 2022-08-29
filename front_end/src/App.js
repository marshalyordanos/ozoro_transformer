import { Route, Routes } from "react-router-dom";
import "./App.css";
import ViewTransformer from "./components/ViewTransformer";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="con">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:id" element={<ViewTransformer />} />
        <Route path="/home/edit/:id" element={<h1>edit page</h1>} />
      </Routes>
    </div>
  );
}

export default App;
