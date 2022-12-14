import React, {useEffect} from "react";
import Axios from "axios";
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "./Home";
import LecturerTable from "./LecturerTable";
const Admin = () => {
    useEffect(() => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }};
        Axios
            .get("http://localhost:4000/roles", config)
            .then(res => {
                console.log(res.data.role)
                if(!res.data.role.includes("admin")){
                    window.location.replace("/denied");
                }
            })
            .catch(e => {
                console.log("catch");
            })
    }, []);
    
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lecturer" element={<LecturerTable />} />
                <Route path="*" element={<Navigate replace to="" />} />
            </Routes>
        </>
    );
};

export default Admin;