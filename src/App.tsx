import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./users/Index";
import Create from "./users/Create";
import ViewPage from "./users/ViewPage";
import NoPage from "./users/NoPage";
import EditPage from "./users/EditPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/administrators" />} />
          <Route path="/admin/administrators" element={<HomePage />} />
          <Route path="/admin/create-user" element={<Create />} />
          <Route path="/admin/view-details" element={<ViewPage />} />
          <Route path="/edit-user" element={<EditPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
