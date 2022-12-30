import React, {useEffect} from "react";
import Axios from "axios";
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "./Home";
const Lecturer = (props) => {
    useEffect(() => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }};
        Axios
            .get("http://localhost:4000/roles", config)
            .then(res => {
                if(!res.data.role.includes("lecturer"+props.lecturerType)){
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
                <Route path="/" element={<Home lecturerType={props.lecturerType} socket={props.socket}/>} />
                <Route path="*" element={<Navigate replace to="" />} />
            </Routes>
        </>
    );
};

export default Lecturer;