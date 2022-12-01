import React, {useEffect, useState} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../../Style/Admin/Home.css";
import linkImage from '../../Images/logo192.png';
import LecturerTable from "./LecturerTable";
import StudentTable from "./StudentTable";
import ThesisTable from "./ThesisTable";
const Home = () => {
    const [renderComponent, setRenderComponent] = useState("home");
    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios.get("http://localhost:5000/getNotifications", config).then((response) => {
            setNotifications(response.data);
        });
    }, [])

    const closePopUp = (e) => {
        if ( !(e.target).closest('.pop-up-content') ) {
            setRenderComponent("home");
        }
    }

    const changeRenderComponent = (component) => {
        setRenderComponent(component);
    }

    const renderPopUp = () => {
        switch(renderComponent) {
            case "student-list":
                return (<div className="pop-up"  onClick={(e) => closePopUp(e)}>
                            <div className="pop-up-content"><StudentTable/></div>
                        </div>)
            case "lecturer-list":
                return (<div className="pop-up"  onClick={(e) => closePopUp(e)}>
                            <div className="pop-up-content"><LecturerTable/></div>
                        </div>)
            case "thesis-list":
                return (<div className="pop-up"  onClick={(e) => closePopUp(e)}>
                            <div className="pop-up-content"><ThesisTable/></div>
                        </div>)
        }
    }

    return (
        <>
            <div className="admin-home">
                <div className="nav">
                    {notifications.length !== 0 ? 
                        <div className="nav-row">
                            <div className="notification-block">
                                {/* <div className="nav-block-title">Notifications</div> */}
                                <div className="notification-block-content">
                                    {notifications.map((notification)=>{
                                        return(
                                            <div className="notification-row" key={notification.notification_id}>
                                                {/* <b>{notification.title}</b> */}
                                                <div>{notification.content}</div>
                                                <div>{new Date(notification.created_at).toLocaleString("vi-VN")}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div> : 
                    null}
                    <div className="nav-row">
                        <div className="nav-block" onClick={() => changeRenderComponent("student-list")}>
                                <div className="nav-block-title">Student</div>
                                <div className="nav-block-content"><img className="logo" src={linkImage} alt="linkImage"/></div>
                        </div>
                        <div className="nav-block" onClick={() => changeRenderComponent("lecturer-list")}>
                                <div className="nav-block-title">Lecturer</div>
                                <div className="nav-block-content"><img className="logo" src={linkImage} alt="linkImage"/></div>
                        </div>
                        <div className="nav-block" onClick={() => changeRenderComponent("thesis-list")}>
                                <div className="nav-block-title">Thesis</div>
                                <div className="nav-block-content"><img className="logo" src={linkImage} alt="linkImage"/></div>
                        </div>
                    </div>
                    <div className="nav-row">
                        <div className="nav-link">
                            <div className="nav-block">
                                <div className="nav-block-title">Account Settings</div>
                            </div>
                        </div>
                        <div className="nav-link">
                            <div className="nav-block">
                                <div className="nav-block-title">Contact</div>
                            </div>
                        </div>
                        <div className="nav-link">
                            <div className="nav-block">
                                <div className="nav-block-title">Security</div>
                            </div>
                        </div>
                    </div>
                    {renderPopUp()}
                </div>
            </div>
        </>
    );
};

export default Home;