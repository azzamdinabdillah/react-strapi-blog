import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./user/pages/Homepage";
import SingleBlog from "./user/pages/SingleBlog";
import BlogByCategory from "./user/pages/BlogByCategory";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog">
          <Route path=":id/:slug" element={<SingleBlog />} />
          <Route path="category/:documentId/:slug" element={<BlogByCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
