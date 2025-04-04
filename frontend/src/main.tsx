import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./dashboard.css";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import Homepage from "./user/pages/Homepage";
import SingleBlog from "./user/pages/SingleBlog";
import BlogByCategory from "./user/pages/BlogByCategory";
import BlogByAuthor from "./user/pages/BlogByAuthor";
import Dashboard from "./dashboard/pages/Dashboard";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { openSidebarDrawer } from "./dashboard/slices/sidebarDrawer";
import Blogs from "./dashboard/pages/blogs/Blogs";
import Login from "./dashboard/pages/auth/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authSlice } from "./dashboard/slices/authSlices";
import FormBlog from "./dashboard/pages/blogs/FormBlog";
import { ToastContainer, Bounce } from "react-toastify";
import Register from "./dashboard/pages/auth/Register";
import Categories from "./dashboard/pages/categories/Categories";
import FormCategory from "./dashboard/pages/categories/FormCategory";

const store = configureStore({
  reducer: {
    openSidebarDrawer: openSidebarDrawer.reducer,
    authSlice: authSlice.reducer,
  },
});

const queryClient = new QueryClient();

function ProtectedRoute() {
  return !!localStorage.getItem("tokenJwt") ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer
      icon={false}
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter basename="/react-strapi-blog/">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/blog">
              <Route path=":id/:slug" element={<SingleBlog />} />
              <Route
                path="category/:documentId/:slug"
                element={<BlogByCategory />}
              />
              <Route path="author/:author" element={<BlogByAuthor />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="blogs">
                <Route index element={<Blogs />} />
                <Route path="add-blog" element={<FormBlog />} />
                <Route path="edit-blog/:id/:slug" element={<FormBlog />} />
              </Route>
              <Route path="categories">
                <Route index element={<Categories />} />
                <Route path="add-category" element={<FormCategory />} />
                <Route path="edit-category/:documentId/:slug" element={<FormCategory />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
