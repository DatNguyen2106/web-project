import React, {useState} from "react";
import { Link } from "react-router-dom";
import "../../Style/Admin/Home.css";
import linkImage from '../../Images/logo192.png';
import LecturerTable from "./LecturerTable";
const Home = () => {
    const [renderComponent, setRenderComponent] = useState("home");

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
                            <div className="pop-up-content">student-list</div>
                        </div>)
            case "lecturer-list":
                return (<div className="pop-up"  onClick={(e) => closePopUp(e)}>
                            <div className="pop-up-content"><LecturerTable/></div>
                        </div>)
            case "thesis-list":
                return (<div className="pop-up"  onClick={(e) => closePopUp(e)}>
                            <div className="pop-up-content">thesis-list</div>
                        </div>)
        }
    }

    return (
        <>
            <div className="admin-home">
                <div className="nav">
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
                        <Link to="/admin/home" className="nav-link">
                            <div className="nav-block">
                                <div className="nav-block-title">Account Settings</div>
                            </div>
                        </Link>
                        <Link to="/admin/home" className="nav-link">
                            <div className="nav-block">
                                <div className="nav-block-title">Notifications</div>
                            </div>
                        </Link>
                        <Link to="/admin/home" className="nav-link">
                            <div className="nav-block">
                                <div className="nav-block-title">Security</div>
                            </div>
                        </Link>
                    </div>
                    {renderPopUp()}
                </div>
            </div>
        </>
    );
};

export default Home;