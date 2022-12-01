import React, { useEffect, useState }  from "react";
import Axios from "axios";
import "../../Style/Admin/LecturerTable.css";
import PaginationBar from "../PaginationBar";
import detail_icon from '../../Images/detail_icon.png';
import change_icon from '../../Images/change_icon.png';
import delete_icon from '../../Images/delete_icon.png';
const StudentTable = () => {
    const [reload, setReload] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [studentFormContent, setStudentFormContent] = useState({id: "", userName:"", fullName:"", email:"", intake: "", ects:""});
    const [studentFormError, setStudentFormError] = useState({id: "", userName:"", fullName:"", email:"", intake: "", ects:""});
    const [studentListSearch, setStudentListSearch] = useState({id: "", userName:"", fullName:"", email:"", intake: "", ects:""});
    const [studentList, setStudentList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [openForm, setOpenForm] = React.useState(false);

    useEffect(() => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            id: studentListSearch.id,
            username: studentListSearch.userName,
            fullname: studentListSearch.fullName,
            email: studentListSearch.email,
            intake: studentListSearch.intake,
            ects: studentListSearch.ects,
            page: activePage.toString()
        }
        Axios.post("http://localhost:5000/admin/get/students", body, config).then((response) => {
            setStudentList(response.data.list);
            setTotalPage(response.data.totalPage);
            if (activePage > response.data.totalPage) setActivePage(response.data.totalPage);
        });
    }, [reload, activePage]);

    const changeForm = (field, value) => {
        setStudentFormContent({
            ...studentFormContent,
            [field]: value
        });
    };

    const changeSearch = (field, value) => {
        setStudentListSearch({
            ...studentListSearch,
            [field]: value
        });
    };

    const search = () => {
        setReload(!reload);
    };

    const validateForm = () => {
        let formError = {id: "", userName:"", fullName:"", email:"", intake: "", ects: ""};
        if(isAdd){
            if(!studentFormContent.id){
                formError.id = "Id cannot be empty"
            }else if(!/^-?\d+$/.test(studentFormContent.id)){
                formError.id = "Id must be a number"
            }
        }
        if(!studentFormContent.userName){
            formError.userName = "User Name cannot be empty"
        }
        if(!studentFormContent.fullName){
            formError.fullName = "Full Name cannot be empty"
        }
        if(!studentFormContent.email){
            formError.email = "Email cannot be empty"
        }else if(!/^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/.test(studentFormContent.email)){
            formError.email = "Email does not match email format"
        }
        if(!studentFormContent.intake){
            formError.intake = "Intake cannot be empty"
        }
        if(isAdd){
            if(!studentFormContent.ects){
                formError.ects = "ECTS cannot be empty"
            }else if(!/^-?\d+$/.test(studentFormContent.id)){
                formError.ects = "ECTS must be a number"
            }
        }
        setStudentFormError(formError);
    }

    useEffect(() => {
        validateForm();
    }, [studentFormContent]);

    const submitForm = () => {
        if (studentFormError.id === "" && studentFormError.userName === "" && studentFormError.fullName === "" && studentFormError.email === "" && studentFormError.intake === "" && studentFormError.ects === ""){
            let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
            let body = {
                username: studentFormContent.userName,
                fullname: studentFormContent.fullName,
                email: studentFormContent.email,
                intake: studentFormContent.intake,
                ects: studentFormContent.ects
            }
            if(isAdd) {body.id = parseInt(studentFormContent.id)}
            let url = isAdd ? `http://localhost:5000/admin/add/student` : `http://localhost:5000/admin/update/student/${studentFormContent.id}`
            let method = isAdd ? "post" : "put"
            Axios[method](url, body, config).then((response)=>{
                setIsAdd(true)
                setStudentFormContent({id: "", userName:"", fullName:"", email:"", intake: "", ects: ""})
                setStudentFormError({id: "", userName:"", fullName:"", email:"", intake: "", ects: ""})
                setReload(!reload)
            }).catch(e => {
                console.log("catch");
            });
        }
    };

    const cancelForm = () => {
        setStudentFormContent({id: "", userName:"", fullName:"", email:"", intake: "", ects:""})
        setStudentFormError({id: "", userName:"", fullName:"", email:"", intake: "", ects:""})
        setIsAdd(true);
    }

    const editRow = (id) => {
        console.log(id)
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios
            .get(`http://localhost:5000/admin/get/student/${id}`, config)
            .then((res)=>{
                setStudentFormContent({
                    id: res.data.id, 
                    userName: res.data.userName, 
                    fullName: res.data.fullName, 
                    email: res.data.email, 
                    intake: res.data.intake,
                    ects: res.data.ects
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
        Axios.delete(`http://localhost:5000/admin/delete/student/${id}`, config).then((response) => {
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
                <div className="form-title" onClick={handleOpenForm}>Student Form</div>
                {openForm ? (
                    <div className="form-content">
                        <div className="form-content-row">
                            <label>Student ID :</label>
                            <input
                                type="text" 
                                name="student_id" 
                                value={studentFormContent.id} 
                                onChange={(e) => changeForm("id", e.target.value)}
                                disabled={isAdd ? null : "disabled"}>
                            </input>
                            <div className="form-content-row-error">{studentFormError.id}</div>
                        </div>
                        <div className="form-content-row">
                            <label>Student User Name :</label>
                            <input 
                                type="text" 
                                name="student_user_name" 
                                value={studentFormContent.userName} 
                                onChange={(e) => changeForm("userName", e.target.value)}>
                            </input>
                            <div className="form-content-row-error">{studentFormError.userName}</div>
                        </div>
                        <div className="form-content-row">
                            <label>Student Full Name :</label>
                            <input 
                                type="text" 
                                name="student_fullName" 
                                value={studentFormContent.fullName} 
                                onChange={(e) => changeForm("fullName", e.target.value)}>
                            </input>
                            <div className="form-content-row-error">{studentFormError.fullName}</div>
                        </div>
                        <div className="form-content-row">
                            <label>Student Email :</label>
                            <input 
                                type="text" 
                                name="student_email" 
                                value={studentFormContent.email} 
                                onChange={(e) => changeForm("email", e.target.value)}>
                            </input>
                            <div className="form-content-row-error">{studentFormError.email}</div>
                        </div>
                        <div className="form-content-row">
                            <label>Intake :</label>
                            <input 
                                type="text" 
                                name="student_intake" 
                                value={studentFormContent.intake} 
                                onChange={(e) => changeForm("intake", e.target.value)}>
                            </input>
                            <div className="form-content-row-error">{studentFormError.intake}</div>
                        </div>
                        <div className="form-content-row">
                            <label>ECTS :</label>
                            <input 
                                type="text" 
                                name="student_ects" 
                                value={studentFormContent.ects} 
                                onChange={(e) => changeForm("ects", e.target.value)}>
                            </input>
                            <div className="form-content-row-error">{studentFormError.ects}</div>
                        </div>
                        <div className="form-button-area">
                            <button className="form-add-button" onClick={submitForm}>{isAdd ? "Add" : "Update"}</button>
                            <button className="form-cancel-button" onClick={cancelForm}>Cancel</button>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="table">
                <div className="table-title">Student Table</div>
                <table className="table-content">
                    <thead>
                        <tr>
                            <th style={{paddingLeft:"1%"}}>
                                <input 
                                    type="text" 
                                    name="student_id" 
                                    value={studentListSearch.id} 
                                    onChange={(e) => changeSearch("id", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="student_user_name" 
                                    value={studentListSearch.userName} 
                                    onChange={(e) => changeSearch("userName", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="student_fullName" 
                                    value={studentListSearch.fullName} 
                                    onChange={(e) => changeSearch("fullName", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="student_email" 
                                    value={studentListSearch.email} 
                                    onChange={(e) => changeSearch("email", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="student_intake" 
                                    value={studentListSearch.intake} 
                                    onChange={(e) => changeSearch("intake", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="student_ects" 
                                    value={studentListSearch.ects} 
                                    onChange={(e) => changeSearch("ects", e.target.value)}>
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
                            <th>Email</th>
                            <th>Intake</th>
                            <th>ECTS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.map((student) => {
                            return (
                                <tr key={student.student_id}>
                                    <td>{student.student_id}</td>
                                    <td>{student.student_user_name}</td>
                                    <td>{student.fullname}</td>
                                    <td>{student.email}</td>
                                    <td>{student.intake}</td>
                                    <td>{student.ects}</td>
                                    <td className="icon-column">
                                        <img className="icon delete_icon" src={delete_icon} alt="delete_icon" onClick={() => deleteRow(student.student_id)}/>
                                        <img className="icon" src={detail_icon} alt="detail_icon"/>
                                        <img className="icon" src={change_icon} onClick={() => editRow(student.student_id)} alt="change_icon"/> 
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

export default StudentTable;