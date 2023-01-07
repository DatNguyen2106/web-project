import React, {useState} from "react";
import Axios from "axios";
const Login = () => {
    const [loginInfo, setloginInfo] = useState({username: "", password: ""});
    const [error, setError] = useState("");

    const changeForm = (field, value) => {
        setloginInfo({
            ...loginInfo,
            [field]: value
        });
    };

    const submitForm = () => {
        let loginAccount = {
            "username": loginInfo.username,
            "password": loginInfo.password
        };
        Axios
            .post("http://localhost:4000/login", loginAccount)
            .then(res => {
                if(!res.data.accessToken){
                    setError(res.data);
                }else{
                    setError("");
                    localStorage.setItem('accessToken', res.data.accessToken);
                    localStorage.setItem('refreshToken', res.data.refreshToken);
                    let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }};
                    Axios
                        .get("http://localhost:4000/roles", config)
                        .then(res => {
                            if(res.data.role.includes("admin")){
                                window.location.replace("/admin");
                            }else if(res.data.role.includes("lecturer1.1")){
                                window.location.replace("/lecturer11");
                            }else if(res.data.role.includes("lecturer1.2")){
                                window.location.replace("/lecturer12");
                            }else if(res.data.role.includes("lecturer2")){
                                window.location.replace("/lecturer2");
                            }else if(res.data.role.includes("student")){
                                window.location.replace("/student");
                            }else{
                                window.location.replace("/denied?message=" + "Access Denied");
                            }
                        })
                        .catch(e => {
                            console.log("catch");
                        })
                }
            })
            .catch(e => {
                console.log("catch");
            });
    }

    return (
        <div>
            {error ? <div>{error}</div> : null}
            <div>
                <label>Username:</label>
                <input id="username" name="username" type="text" onChange={(e) => changeForm("username", e.target.value)}/>
            </div>
            <div>
                <label>Password:</label>
                <input id="password" name="password" type="password" onChange={(e) => changeForm("password", e.target.value)}/>
            </div>
            <button className="login-button" onClick={submitForm}>Login</button>
        </div>
    );
};

export default Login;