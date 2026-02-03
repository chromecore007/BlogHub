import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/create"
  element={
    <ProtectedRoute>
      <CreateBlog />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit/:id"
  element={
    <ProtectedRoute>
      <EditBlog />
    </ProtectedRoute>
  }
/>

      </Routes>
    </>
  );
}


export default App;
