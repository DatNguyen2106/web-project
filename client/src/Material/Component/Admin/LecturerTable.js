import React, { useEffect, useState }  from "react";
import Axios from "axios";
import "../../Style/Admin/LecturerTable.css";
import PaginationBar from "../PaginationBar";
import detail_icon from '../../Images/detail_icon.png';
import change_icon from '../../Images/change_icon.png';
import delete_icon from '../../Images/delete_icon.png';
const LecturerTable = () => {
    const [reload, setReload] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [lecturerFormContent, setLecturerFormContent] = useState({id: "", userName:"", fullName:"", title:"", email:"", sup: ""});
    const [lecturerFormError, setLecturerFormError] = useState({id: "", userName:"", fullName:"", title:"", email:"", sup: ""});
    const [lecturerListSearch, setLecturerListSearch] = useState({id: "", userName:"", fullName:"", title:"", email:"", sup: ""});
    const [lecturerList, setLecturerList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [openForm, setOpenForm] = React.useState(false);

    useEffect(() => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            id: lecturerListSearch.id,
            username: lecturerListSearch.userName,
            fullname: lecturerListSearch.fullName,
            title: lecturerListSearch.title,
            email: lecturerListSearch.email,
            supervisor: lecturerListSearch.sup,
            page: activePage.toString()
        }
        Axios.post("http://localhost:5000/admin/get/lecturers", body, config).then((response) => {
          setLecturerList(response.data.list);
          setTotalPage(response.data.totalPage);
        });
    }, [reload, activePage]);

    const changeForm = (field, value) => {
        setLecturerFormContent({
            ...lecturerFormContent,
            [field]: value
        });
    };

    const changeSearch = (field, value) => {
        setLecturerListSearch({
            ...lecturerListSearch,
            [field]: value
        });
    };

    const search = () => {
        setReload(!reload);
    };

    const validateForm = () => {
        let formError = {id: "", userName:"", fullName:"", title:"", email:"", sup: ""};
        if(isAdd){
            if(!lecturerFormContent.id){
                formError.id = "Id cannot be empty"
            }else if(!/^-?\d+$/.test(lecturerFormContent.id)){
                formError.id = "Id must be a number"
            }
        }
        if(!lecturerFormContent.userName){
            formError.userName = "User Name cannot be empty"
        }
        if(!lecturerFormContent.fullName){
            formError.fullName = "Full Name cannot be empty"
        }
        if(!lecturerFormContent.title){
            formError.title = "Title cannot be empty"
        }
        if(!lecturerFormContent.email){
            formError.email = "Email cannot be empty"
        }else if(!/^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/.test(lecturerFormContent.email)){
            formError.email = "Email does not match email format"
        }
        if(!lecturerFormContent.sup){
            formError.sup = "Supervisor cannot be empty"
        }
        setLecturerFormError(formError);
        
    }

    useEffect(() => {
        validateForm();
    }, [lecturerFormContent]);

    const submitForm = () => {
        validateForm();
        if (lecturerFormError.id === "" && lecturerFormError.userName === "" && lecturerFormError.fullName === "" && lecturerFormError.title === "" && lecturerFormError.email === "" && lecturerFormError.sup === ""){
            let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
            let body = {
                username: lecturerFormContent.userName,
                fullname: lecturerFormContent.fullName,
                title: lecturerFormContent.title,
                email: lecturerFormContent.email,
                supervisor: lecturerFormContent.sup,
            }
            if(isAdd) {body.id = parseInt(lecturerFormContent.id)}
            let url = isAdd ? `http://localhost:5000/admin/add/lecturer` : `http://localhost:5000/admin/update/lecturer/${lecturerFormContent.id}`
            let method = isAdd ? "post" : "put"
            Axios[method](url, body, config).then((response)=>{
                setIsAdd(true)
                setLecturerFormContent({id: "", userName:"", fullName:"", title:"", email:"", sup: ""})
                setLecturerFormError({id: "", userName:"", fullName:"", title:"", email:"", sup: ""})
                setReload(!reload)
            }).catch(e => {
                console.log("catch");
            });
        }
    };

    const cancelForm = () => {
        setLecturerFormContent({id: "", userName:"", fullName:"", title:"", email:"", sup: ""})
        setLecturerFormError({id: "", userName:"", fullName:"", title:"", email:"", sup: ""})
        setIsAdd(true);
    }

    const editRow = (id) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios
            .get(`http://localhost:5000/admin/get/lecturer/${id}`, config)
            .then((res)=>{
                setLecturerFormContent({
                    id: res.data.id, 
                    userName: res.data.userName, 
                    fullName: res.data.fullName, 
                    title: res.data.title,
                    email: res.data.email, 
                    sup: res.data.supervisor
                })
                setIsAdd(false);
                setOpenForm(true);
            })
            .catch((e)=>{
                console.log("catch")
            })
    }

    const deleteRow = (id) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios.delete(`http://localhost:5000/admin/delete/lecturer/${id}`, config).then((response) => {
            setReload(!reload);
        }).catch(e => {
            console.log("catch");
        });
    };

    const handleOpenForm = () => {
        setOpenForm(!openForm);
    };

    const changePage = (move) => {
        if (move === "prev" && activePage > 1){
            setActivePage(activePage-1);      
        } else if ((move === "next") && (activePage < totalPage)){
            setActivePage(activePage+1);   
        }
        setReload(!reload);
    };

    const changePageDirect = (pageNumber) => {
        setActivePage(pageNumber);
        setReload(!reload);
    };

    return (
        <div className="admin-lecturer-list">
            <div className="form">
                <div className="form-title" onClick={handleOpenForm}>Lecturer Form</div>
                {openForm ? (
                    <div className="form-content">
                        <div className="form-content-row">
                            <label>Lecturer ID :</label>
                            <input
                                type="text" 
                                name="lecturer_id" 
                                value={lecturerFormContent.id} 
                                onChange={(e) => changeForm("id", e.target.value)}
                                disabled={isAdd ? null : "disabled"}>
                            </input>
                            <div className="form-content-row-error">{lecturerFormError.id}</div>
                        </div>
                        <div className="form-content-row">
                            <label>Lecturer User Name :</label>
                            <input 
                                type="text" 
                                name="lecturer_user_name" 
                                value={lecturerFormContent.userName} 
                                onChange={(e) => changeForm("userName", e.target.value)}>
                            </input>
                            <div className="form-content-row-error">{lecturerFormError.userName}</div>
                        </div>
                        <div className="form-content-row">
                            <label>Lecturer Full Name :</label>
                            <input 
                                type="text" 
                                name="lecturer_fullName" 
                                value={lecturerFormContent.fullName} 
                                onChange={(e) => changeForm("fullName", e.target.value)}>
                            </input>
                            <div className="form-content-row-error">{lecturerFormError.fullName}</div>
                        </div>
                        <div className="form-content-row">
                            <label>Lecturer Title :</label>
                            <input 
                                type="text" 
                                name="lecturer_title" 
                                value={lecturerFormContent.title} 
                                onChange={(e) => changeForm("title", e.target.value)}>
                            </input>
                            <div className="form-content-row-error">{lecturerFormError.title}</div>
                        </div>
                        <div className="form-content-row">
                            <label>Lecturer Email :</label>
                            <input 
                                type="text" 
                                name="lecturer_email" 
                                value={lecturerFormContent.email} 
                                onChange={(e) => changeForm("email", e.target.value)}>
                            </input>
                            <div className="form-content-row-error">{lecturerFormError.email}</div>
                        </div>
                        <div className="form-content-row">
                            <label>Supervisor :</label>
                            <input 
                                type="text" 
                                name="lecturer_supervisor" 
                                value={lecturerFormContent.sup} 
                                onChange={(e) => changeForm("sup", e.target.value)}>
                            </input>
                            <div className="form-content-row-error">{lecturerFormError.sup}</div>
                        </div>
                        <div className="form-button-area">
                            <button className="form-add-button" onClick={submitForm}>{isAdd ? "Add" : "Update"}</button>
                            <button className="form-cancel-button" onClick={cancelForm}>Cancel</button>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="table">
                <div className="table-title">Lecturer Table</div>
                <table className="table-content">
                    <thead>
                        <tr>
                            <th style={{paddingLeft:"1%"}}>
                                <input 
                                    type="text" 
                                    name="lecturer_id" 
                                    value={lecturerListSearch.id} 
                                    onChange={(e) => changeSearch("id", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="lecturer_user_name" 
                                    value={lecturerListSearch.userName} 
                                    onChange={(e) => changeSearch("userName", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="lecturer_fullName" 
                                    value={lecturerListSearch.fullName} 
                                    onChange={(e) => changeSearch("fullName", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="lecturer_title" 
                                    value={lecturerListSearch.title} 
                                    onChange={(e) => changeSearch("title", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="lecturer_email" 
                                    value={lecturerListSearch.email} 
                                    onChange={(e) => changeSearch("email", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="lecturer_supervisor" 
                                    value={lecturerListSearch.sup} 
                                    onChange={(e) => changeSearch("sup", e.target.value)}>
                                </input>
                            </th>
                            <th style={{paddingRight:"1%"}}>
                                <button className="search-button" onClick={search}>Search</button>
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Full Name</th>
                            <th>Title</th>
                            <th>Email</th>
                            <th>Supervisor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lecturerList.map((lecturer) => {
                            return (
                                <tr key={lecturer.lecturer_id}>
                                    <td>{lecturer.lecturer_id}</td>
                                    <td>{lecturer.lecturer_user_name}</td>
                                    <td>{lecturer.fullname}</td>
                                    <td>{lecturer.title}</td>
                                    <td>{lecturer.email}</td>
                                    <td>{lecturer.supervisor}</td>
                                    <td className="icon-column">
                                        <img className="icon delete_icon" src={delete_icon} alt="delete_icon" onClick={() => deleteRow(lecturer.lecturer_id)}/>
                                        <img className="icon" src={detail_icon} alt="detail_icon"/>
                                        <img className="icon" src={change_icon} onClick={() => editRow(lecturer.lecturer_id)} alt="change_icon"/> 
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <PaginationBar totalPage={totalPage} activePage={activePage} changePage={changePage} changePageDirect={changePageDirect}/>
            </div>
        </div>
            
    );
};

export default LecturerTable;