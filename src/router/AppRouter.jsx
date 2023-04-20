import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BlogDetail from "../pages/BlogDetail";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Footer from "../components/Footer";
import PrivateRouter from "./PrivateRouter";
import NewBlog from "../pages/NewBlog";
import MyBlogs from "../pages/MyBlogs";
import Author from "../pages/Author";



//BrowserRouter Router olarak import edildi. dikkat etmek lazım.
const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="blog/:id" element={<BlogDetail />} />
                <Route path="blog/author/:id" element={<Author />} />
                <Route path="about" element={<About />} />
                <Route path="notfound" element={<NotFound />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="My Blogs" element={<PrivateRouter />}>
                    <Route path=":id" element={<BlogDetail />} />
                    <Route path="" element={<MyBlogs />} />
                </Route>
                <Route path="profile" element={<PrivateRouter />}>
                    <Route path="" element={<Profile />} />
                </Route>
                <Route path="New Blog" element={<PrivateRouter />}>
                    <Route path="" element={<NewBlog />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default AppRouter;