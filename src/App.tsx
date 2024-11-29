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
          <Route path="/" element={<Navigate to="/user" />} />
          <Route path="/user" element={<Index />} />
          <Route path="/user/create-user" element={<Create />} />
          <Route path="/user/:id" element={<Details />} />
          <Route path="/user/:id/edit" element={<Edit />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
