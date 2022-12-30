import React, {useEffect, useState} from "react";
import Axios from "axios";
import "../../Style/Admin/Home.css";
import linkImage from '../../Images/logo192.png';
import AddingTheses from "./AddingTheses";
import ManagingTheses from "./ManagingTheses";
const Home = (props) => {
    const [renderComponent, setRenderComponent] = useState("home");
    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        console.log(props.lecturerType)
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios.get("http://localhost:5000/getNotifications", config).then((response) => {
            setNotifications(response.data);
        });

        props.socket.on("notificationSent", (res)=>{
            setNotifications(res)
        })
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
                            <div className="pop-up-content"><ManagingTheses lecturerType={props.lecturerType}/></div>
                        </div>)
            case "lecturer-list":
                return (<div className="pop-up"  onClick={(e) => closePopUp(e)}>
                            <div className="pop-up-content"><AddingTheses lecturerType={props.lecturerType}/></div>
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
                                <div className="nav-block-title">Managing Theses</div>
                                <div className="nav-block-content"><img className="logo" src={linkImage} alt="linkImage"/></div>
                        </div>
                        {
                            props.lecturerType==="1.1" ? 
                                <div className="nav-block" onClick={() => changeRenderComponent("lecturer-list")}>
                                    <div className="nav-block-title">Adding Theses</div>
                                    <div className="nav-block-content"><img className="logo" src={linkImage} alt="linkImage"/></div>
                                </div> : 
                                null
                        }
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