import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ViewPage from "./pages/ViewPage";
import NoPage from "./pages/NoPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/administrators" />} />
          <Route path="/admin/administrators" element={<HomePage />} />
          <Route path="/admin/create-user" element={<CreatePage />} />
          <Route path="/admin/view-details" element={<ViewPage />} />
          <Route path="/edit-user" element={<EditPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
