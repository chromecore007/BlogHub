import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/form.css";
import "./styles/blog.css";
import "./styles/comment.css";
import "./styles/buttons.css";
import "./styles/animation.css";
import "./styles/responsive.css";
import "./styles/home.css";
import "./styles/createBlog.css";
import "./styles/editBlog.css";
import "./styles/blogDetail.css";
import "./styles/login.css";
import "./styles/register.css";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
