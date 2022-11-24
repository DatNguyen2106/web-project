import React from "react";
import Axios from "axios";
import logo from '../Images/vgu_logo.png';
const Header = () => {
    const logout = () => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }};
        Axios
            .delete("http://localhost:4000/logout", config)
            .then(() => {       
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.replace("/login");
            })
            .catch(e => {
                console.log("catch");
            })
    }

    return (
        <div className="header">
            <img className="logo" src={logo} alt="logo"/>
            {window.location.href.endsWith("/login") ? null : <button style={{float: "right"}} onClick={logout}>Logout</button>}
        </div>
    );
};

export default Header;