import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./users/Index";
import Create from "./users/Create";
import Details from "./users/Details";
import NoPage from "./users/NoPage";
import Edit from "./users/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/administrators" />} />
          <Route path="/admin/administrators" element={<Index />} />
          <Route path="/admin/create-user" element={<Create />} />
          <Route path="/admin/:id" element={<Details />} />
          <Route path="/admin/:id/edit-user" element={<Edit />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
