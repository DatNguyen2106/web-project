import React, { useEffect, useState }  from "react";
import Axios from "axios";
import "../../Style/Admin/LecturerTable.css";
import PaginationBar from "../PaginationBar";
import InputRow from "../InputRow.js";
import detail_icon from '../../Images/detail_icon.png';
import add_icon from '../../Images/add_icon.png';
const LecturerTable = () => {
    const [reload, setReload] = useState(false);
    const [studentThesis, setStudentThesis] = useState({})
    const [lecturerDetail, setLecturerDetail] = useState({id: "", fullName:"", title:"", email:"", sup: "", numOfTheses: 0, maxOfTheses: 0, thesisList: []});
    const [lecturerListSearch, setLecturerListSearch] = useState({id: "", title:"", fullName:"", email:"", sup:"", isAvailable: true});
    const [lecturerList, setLecturerList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [openForm, setOpenForm] = React.useState(false);

    useEffect(() => {
        console.log(lecturerListSearch)
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            lecturerId: lecturerListSearch.id,
            lecturerTitle: lecturerListSearch.title,
            lecturerFullName: lecturerListSearch.fullName,
            email: lecturerListSearch.email,
            supervisor: lecturerListSearch.sup,
            isAvailable: lecturerListSearch.isAvailable === "false" ? false : true,
            page: activePage.toString()
        }
        Axios.post("http://localhost:5000/student/get/lecturers", body, config).then((response) => {
          setLecturerList(response.data.list);
          setTotalPage(response.data.totalPage);
        });
    }, [reload, activePage]);

    useEffect(() => {
        console.log(lecturerListSearch)
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios.get("http://localhost:5000/student/get/thesis", config).then((response) => {
          console.log(response.data)
          setStudentThesis(response.data)
        }).catch(e => {
            console.log(e);
        });
    }, [reload, activePage]);

    const changeSearch = (field, value) => {
        setLecturerListSearch({
            ...lecturerListSearch,
            [field]: value
        });
    };

    const search = () => {
        setReload(!reload);
    };

    const detailRow = (id) => {
        console.log(id)
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios
            .get(`http://localhost:5000/student/get/lecturer/${id}`, config)
            .then((res)=>{
                let curList = []
                for (const i of res.data){
                    curList.push({
                        id: i.thesis_id,
                        topic: i.thesis_topic,
                        field: i.thesis_field,
                        slot: i.slot,
                        slotMax: i.slot_maximum,
                    })
                }
                setLecturerDetail({
                    id: res.data[0].lecturer_id,
                    fullName: res.data[0].fullname,
                    title: res.data[0].title,
                    email: res.data[0].email,
                    sup: res.data[0].supervisor,
                    numOfTheses: res.data[0].number_of_theses,
                    maxOfTheses: res.data[0].maximum_of_theses,
                    thesisList: curList,
                })
                console.log(lecturerDetail)
                setOpenForm(true);
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    const applyThesis = (id) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            "thesisId" : id
        }
        Axios.post("http://localhost:5000/student/add/confirmSup1", body, config).then((response) => {
          console.log(response.data)
          setReload(!reload);
        }).catch((e)=>{
            console.log(e)
        });
    }

    const addSup2 = (id) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            "lecturer2_id" : id
        }
        Axios.put("http://localhost:5000/student/update/confirmSup2", body, config).then((response) => {
          console.log(response.data)
          setReload(!reload);
        });
    }

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

    const renderActionButton = (lecturer) => {
        if(lecturer.supervisor.includes("lecturer1")){
            if(studentThesis?.list?.length > 0 && !studentThesis?.list[0]?.lecturer2_id ){
                return (
                    <td className="icon-column">
                        <img className="icon" src={add_icon} onClick={() => addSup2(lecturer.lecturer_id)} alt="detail_icon"/> 
                        <img className="icon" src={detail_icon} onClick={() => detailRow(lecturer.lecturer_id)} alt="detail_icon"/> 
                    </td>
                )
            }else {
                return (
                    <td className="icon-column">
                        <img className="icon" src={detail_icon} onClick={() => detailRow(lecturer.lecturer_id)} alt="detail_icon"/> 
                    </td>
                )
            }
        }else if(lecturer.supervisor.includes("lecturer2") && studentThesis?.list?.length > 0 && !studentThesis?.list[0]?.lecturer2_id ){
            return (
                <td className="icon-column">
                    <img className="icon" src={add_icon} onClick={() => addSup2(lecturer.lecturer_id)} alt="detail_icon"/> 
                </td>
            )
        }else{
            return(<td className="icon-column"></td>)
        }
    }

    return (
        <div className="admin-lecturer-list">
            <div className="form">
                <div className="form-title" onClick={handleOpenForm}>Lecturer Form</div>
                {openForm && lecturerDetail.id ? (
                    <div className="form-content">
                        <InputRow label="Lecturer ID :" value={lecturerDetail.id} isDisabled="disabled"/>
                        <InputRow label="Lecturer Full Name :" value={lecturerDetail.fullName} isDisabled="disabled"/>
                        <InputRow label="Lecturer Title :" value={lecturerDetail.title} isDisabled="disabled"/>
                        <InputRow label="Lecturer Email :" value={lecturerDetail.email} isDisabled="disabled"/>
                        <InputRow label="Lecturer Sup :" value={lecturerDetail.sup} isDisabled="disabled"/>
                        <InputRow label="Lecturer Number Of Theses :" value={lecturerDetail.numOfTheses} isDisabled="disabled"/>
                        <InputRow label="Lecturer Maximum Of Theses :" value={lecturerDetail.maxOfTheses} isDisabled="disabled"/>
                        <table className="table-content">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Topic</th>
                                <th>Field</th>
                                <th>Slot</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {lecturerDetail.thesisList.map((thesis) => {
                                return (
                                    <tr key={thesis.id}>
                                        <td>{thesis.id}</td>
                                        <td>{thesis.topic}</td>
                                        <td>{thesis.field}</td>
                                        <td>{thesis.slot + "/" + thesis.slotMax}</td>
                                        {
                                            thesis.slot >= thesis.slotMax || lecturerDetail.numOfTheses >= lecturerDetail.maxOfTheses || studentThesis?.list?.length > 0
                                            ? <td className="icon-column"></td> 
                                            : 
                                                <td className="icon-column">
                                                    <img className="icon" src={add_icon} onClick={() => applyThesis(thesis.id)} alt="detail_icon"/> 
                                                </td>
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
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
                                    name="lecturer_title" 
                                    value={lecturerListSearch.title} 
                                    onChange={(e) => changeSearch("title", e.target.value)}>
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
                                    name="lecturer_email" 
                                    value={lecturerListSearch.email} 
                                    onChange={(e) => changeSearch("email", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <select value={lecturerListSearch.sup} onChange={(e) => changeSearch("sup", e.target.value)}>
                                    <option value="" key="">All</option>
                                    <option value="lecturer1" key="lecturer1">Lecturer I</option>
                                    <option value="lecturer2" key="lecturer2">Lecturer II</option>
                                </select>
                            </th>
                            <th>
                                <select value={lecturerListSearch.isAvailable} onChange={(e) => changeSearch("isAvailable", e.target.value)}>
                                    <option value={true} key={true}>Still Available</option>
                                    <option value={false} key={false}>Full</option>
                                </select>
                            </th>
                            <th style={{paddingRight:"1%"}}>
                                <button className="search-button" onClick={search}>Search</button>
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Slot</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lecturerList.map((lecturer) => {
                            return (
                                <tr key={lecturer.lecturer_id}>
                                    <td>{lecturer.lecturer_id}</td>
                                    <td>{lecturer.title}</td>
                                    <td>{lecturer.fullname}</td>
                                    <td>{lecturer.email}</td>
                                    <td>{lecturer.supervisor}</td>
                                    <td>{lecturer.number_of_theses+"/"+lecturer.maximum_of_theses}</td>
                                    {renderActionButton(lecturer)}
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