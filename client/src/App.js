import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./App.css";
import Login from "./Material/Component/Login";
import Admin from "./Material/Component/Admin/Admin";
import Lecturer from "./Material/Component/Lecturer/Lecturer";
import Student from "./Material/Component/Student/Student";
import Header from "./Material/Component/Header";
import Footer from "./Material/Component/Footer";
import Error from "./Material/Component/Error";
const App = () => {
    useEffect(() => {
        if (!localStorage.getItem("accessToken") && !(window.location.href.endsWith("/login") || window.location.href.endsWith("/denied"))){
            window.location.replace("/login");
        }
    });

    return (
        <BrowserRouter>
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin/*" element={<Admin />} />
                    <Route path="/lecturer/*" element={<Lecturer />} />
                    <Route path="/student/*" element={<Student />} />
                    <Route path="/denied" element={<Error message="Access denied."/>} />
                    <Route path="/unknown" element={<Error message="The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved."/>} />
                    <Route path="*" element={<Navigate replace to="unknown" />} />
                </Routes>
            </div>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;