import React, {useState, useEffect} from "react";
import Axios from "axios";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import "./App.css";
import Login from "./Material/Component/Login";
import Admin from "./Material/Component/Admin/Admin";
import Lecturer from "./Material/Component/Lecturer/Lecturer";
import Student from "./Material/Component/Student/Student";
import Header from "./Material/Component/Header";
import Footer from "./Material/Component/Footer";
import Error from "./Material/Component/Error";
import { io } from "socket.io-client";
const App = () => {
    if (!localStorage.getItem("accessToken") && !(window.location.href.endsWith("/login") || window.location.href.endsWith("/denied"))){
        window.location.replace("/login");
    } 

    useEffect(() => {
        if(localStorage.getItem("accessToken")) {
            const autoGenerateToken = async () => {
                if(localStorage.getItem("refreshToken")){
                    const refreshToken = localStorage.getItem("refreshToken");
                let body = {
                        refreshToken: refreshToken
                }
                await Axios
                    .post("http://localhost:4000/token", body).then((res) => {
                        localStorage.setItem("accessToken", res.data.accessToken);
                        localStorage.setItem("refreshToken", res.data.refreshToken);
                    })
                }
            }
            var TokenInterval = setInterval(autoGenerateToken, 8000);
        } else clearInterval(TokenInterval);
    }, []);
    
    var socket = io('http://localhost:3001', { transports : ['websocket'] });
    useEffect(() => {
        socket.on("getText", (text) => {
            //console.log(text)
        })    
        socket.on("connect", () => {    
            // console.log(socket.id);
            if(localStorage.getItem("accessToken")){
                socket.emit("updateSocket", {token : localStorage.getItem("accessToken")});
            }
            // socket.on("notificationSent", (text) => console.log(text));
            // socket.on("updateSocket", (text) => console.log(text))                                               
        });
        socket.on("getLecturers", (text) => {
            // console.log(text)
        })
    }, []);

    // const [socket, setSocket] = useState(null);

    // useEffect(() => {
    //     setSocket(io("http://localhost:3001", { transports : ['websocket'] }));
    // }, []);

    // var i = 0;
    // setInterval(() => {
    //     socket?.emit("newUser", i++);
    // }, 3000)

    return (
        <BrowserRouter>
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin/*" element={<Admin socket={socket}/>} />
                    <Route path="/lecturer11/*" element={<Lecturer lecturerType="1.1" socket={socket}/>} />
                    <Route path="/lecturer12/*" element={<Lecturer lecturerType="1.2" socket={socket}/>} />
                    <Route path="/lecturer2/*" element={<Lecturer lecturerType="2" socket={socket}/>} />
                    <Route path="/student/*" element={<Student socket={socket}/>} />
                    <Route path="/denied" element={<Error message={(new URLSearchParams(window.location.search)).get('message')}/>} />
                    <Route path="/unknown" element={<Error message="The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved."/>} />
                    <Route path="*" element={<Navigate replace to="unknown" />} />
                </Routes>
            </div>
            <Footer/>
        </BrowserRouter>
    );
};

export default App;