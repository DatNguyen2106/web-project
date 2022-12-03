import React, { useEffect, useState }  from "react";
import Axios from "axios";
import "../../Style/Admin/LecturerTable.css";
import PaginationBar from "../PaginationBar";
import InputRow from "./InputRow.js";
import detail_icon from '../../Images/detail_icon.png';
import change_icon from '../../Images/change_icon.png';
import delete_icon from '../../Images/delete_icon.png';
const ThesisTable = () => {
    const defaultForm = {
        id: "",
        topic: "",
        field: "",
        idSup1: "",
        titleSup1: "",
        idSup2: "",
        titleSup2: "",
        student: "",
        slot: "",
        slotMax: "",
        step: "",
        activateRegistration: "",
        activateDefense: "",
        // availableDay: "",
        // defenseDay: "",
        numberHardCopies: "",
        printRequirements: "",
        templateFiles: "",
        submissionDeadline: "",
    }
    const [reload, setReload] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [thesisFormContent, setThesisFormContent] = useState({...defaultForm});
    const [thesisFormError, setThesisFormError] = useState({...defaultForm});
    const [thesisListSearch, setThesisListSearch] = useState({});
    const [thesisList, setThesisList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [openForm, setOpenForm] = React.useState(false);

    useEffect(() => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            thesisId: thesisListSearch.id,
            thesisTopic: thesisListSearch.topic,
            sup1: thesisListSearch.sup1,
            sup2: thesisListSearch.sup2,
            slot: thesisListSearch.slot,
            slotMaximum: thesisListSearch.slotMax,
            page: activePage.toString()
        }
        Axios.post("http://localhost:5000/admin/get/theses", body, config).then((response) => {
            setThesisList(response.data.list);
            setTotalPage(response.data.totalPage);
            if (activePage > response.data.totalPage) setActivePage(response.data.totalPage);
        });
    }, [reload, activePage]);

    const changeForm = (field, value) => {
        setThesisFormContent({
            ...thesisFormContent,
            [field]: value
        });
    };

    const changeSearch = (field, value) => {
        setThesisListSearch({
            ...thesisListSearch,
            [field]: value
        });
    };

    const search = () => {
        setReload(!reload);
    };

    const validateForm = () => {
        let formError = {...defaultForm};
        if(!thesisFormContent.id){
            formError.id = "Id cannot be empty"
        }else if(!/^-?\d+$/.test(thesisFormContent.id)){
            formError.id = "Id must be a number"
        }
        if(!thesisFormContent.topic){
            formError.topic = "Topic cannot be empty"
        }
        if(!thesisFormContent.field){
            formError.field = "Field Name cannot be empty"
        }
        if(isAdd){
            if(!thesisFormContent.idSup1){
                formError.idSup1 = "Supervisor 1's ID cannot be empty"
            }else if(!/^-?\d+$/.test(thesisFormContent.idSup1)){
                formError.idSup1 = "Supervisor 1's ID must be a number"
            }
        }
        if(!thesisFormContent.slotMax){
            formError.slotMax = "Slot Maximum cannot be empty"
        }else if(!/^-?\d+$/.test(thesisFormContent.slotMax)){
            formError.idSup1 = "Slot Maximum must be a number"
        }
        if(!isAdd){
            if(!thesisFormContent.activateRegistration){
                formError.activateRegistration = "Activate Registration cannot be empty"
            }
            if(!thesisFormContent.activateDefense){
                formError.activateDefense = "Activate Defense cannot be empty"
            }
        }
        setThesisFormError(formError);
    }

    useEffect(() => {
        validateForm();
    }, [thesisFormContent]);

    const submitForm = () => {
        if (thesisFormError.id === "" && thesisFormError.topic === "" && thesisFormError.field === "" && thesisFormError.idSup1 === "" && thesisFormError.slotMax === "" && thesisFormError.activateRegistration === "" && thesisFormError.activateDefense === ""){
            let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
            let body = {
                thesisTopic: thesisFormContent.topic,
                thesisField: thesisFormContent.field,
                lecturer1_id: thesisFormContent.idSup1,
                slotMaximum: thesisFormContent.slotMax,
                activateRegistration: thesisFormContent.activateRegistration,
                activateDefense: thesisFormContent.activateDefense,
                numberOfHardCopies: thesisFormContent.numberHardCopies,
                printRequirements: thesisFormContent.printRequirements,
                templateFiles: thesisFormContent.templateFiles,
                submissionDeadline: thesisFormContent.submissionDeadline,
            }
            if(isAdd) {body.thesisId = parseInt(thesisFormContent.id)}
            let url = isAdd ? `http://localhost:5000/admin/add/thesis` : `http://localhost:5000/admin/update/thesis/${thesisFormContent.id}`
            let method = isAdd ? "post" : "put"
            Axios[method](url, body, config).then((response)=>{
                setIsAdd(true)
                setThesisFormContent({...defaultForm})
                setThesisFormError({...defaultForm})
                setReload(!reload)
            }).catch(e => {
                console.log("catch");
            });
        }
    };

    const cancelForm = () => {
        setThesisFormContent({...defaultForm})
        setThesisFormError({...defaultForm})
        setIsAdd(true);
    }

    const editRow = (id) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios
            .get(`http://localhost:5000/admin/get/thesis/${id}`, config)
            .then((res)=>{
                setIsAdd(false);
                setOpenForm(true);
                let studentList = []
                for (const i of res.data){
                    studentList.push(i["student_id"])
                }
                setThesisFormContent({
                    id: res.data[0].thesis_id,
                    topic: res.data[0].thesis_topic,
                    field: res.data[0].thesis_field,
                    idSup1: res.data[0].lecturer1_id,
                    titleSup1: res.data[0].title_lec1,
                    idSup2: res.data[0].lecturer2_id,
                    titleSup2: res.data[0].title_lec2,
                    student: studentList,
                    slot: res.data[0].slot,
                    slotMax: res.data[0].slot_maximum,
                    step: res.data[0].step,
                    activateDefense: res.data[0].activate_defense.toString(),
                    activateRegistration: res.data[0].activate_registration.toString(),
                    // availableDay: res.data[0].available_day,
                    // defenseDay: res.data[0].defense_day,
                    numberHardCopies: res.data[0].number_hard_copies,
                    printRequirements: res.data[0].print_requirements,
                    templateFiles: res.data[0].template_files,
                    submissionDeadline: res.data[0].submission_deadline ? new Date(res.data[0].submission_deadline).toLocaleDateString("fr-CA") : "",
                })
            })
            .catch((e)=>{
                console.log("catch")
            })
    }

    const deleteRow = (id) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios.delete(`http://localhost:5000/admin/delete/thesis/${id}`, config).then((response) => {
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
                <div className="form-title" onClick={handleOpenForm}>Thesis Form</div>
                {openForm ? (
                    <div className="form-content">
                        {
                            isAdd ?
                            <>
                                <InputRow label="Thesis ID :" value={thesisFormContent.id} field="id" error={thesisFormError.id} changeContent={changeForm}/>
                                <InputRow label="Thesis Topic :" value={thesisFormContent.topic} field="topic" error={thesisFormError.topic} changeContent={changeForm}/>
                                <InputRow label="Thesis Field :" value={thesisFormContent.field} field="field" error={thesisFormError.field} changeContent={changeForm}/>
                                <InputRow label="Thesis Supervisor 1 :" value={thesisFormContent.idSup1 ? thesisFormContent.idSup1 : ""} field="idSup1" error={thesisFormError.idSup1} changeContent={changeForm}/>
                                <InputRow label="Thesis Slot Maximum :" value={thesisFormContent.slotMax} field="slotMax" error={thesisFormError.slotMax} changeContent={changeForm}/>
                            </> :
                            <>
                                <InputRow label="Thesis ID :" value={thesisFormContent.id} isDisabled="disabled"/>
                                <InputRow label="Thesis Topic :" value={thesisFormContent.topic} field="topic" error={thesisFormError.topic} changeContent={changeForm}/>
                                <InputRow label="Thesis Field :" value={thesisFormContent.field} field="field" error={thesisFormError.field} changeContent={changeForm}/>
                                <InputRow label="Thesis Supervisor 1 :" value={thesisFormContent.idSup1 ? thesisFormContent.idSup1 : ""} isDisabled="disabled"/>
                                <InputRow label="Thesis Supervisor 2 :" value={thesisFormContent.idSup2 ? thesisFormContent.idSup2 : ""} isDisabled="disabled"/>
                                <InputRow label="Thesis Student :" value={thesisFormContent.student ? thesisFormContent.student.toString() : ""} isDisabled="disabled"/>
                                <InputRow label="Thesis Slot :" value={thesisFormContent.slot} isDisabled="disabled"/>
                                <InputRow label="Thesis Slot Maximum :" value={thesisFormContent.slotMax} isDisabled="disabled"/>
                                <InputRow label="Thesis Step :" value={thesisFormContent.step} isDisabled="disabled"/>
                                <InputRow label="Thesis Activate Registration :" type="select" listContent={[{key: "0", label: "Not Activated"}, {key: "1", label: "Activated"}]} defaultValue={thesisFormContent.activateRegistration} field="activateRegistration" error={thesisFormError.activateRegistration} changeContent={changeForm}/>
                                <InputRow label="Thesis Activate Defense :" type="select" listContent={[{key: "0", label: "Not Activated"}, {key: "1", label: "Activated"}]} defaultValue={thesisFormContent.activateDefense} field="activateDefense" error={thesisFormError.activateDefense} changeContent={changeForm}/>
                                <InputRow label="Thesis Number Of Hard Copies :" value={thesisFormContent.numberHardCopies} field="numberHardCopies" error={thesisFormError.numberHardCopies} changeContent={changeForm}/>
                                <InputRow label="Thesis Print Requirements :" value={thesisFormContent.printRequirements} field="printRequirements" error={thesisFormError.printRequirements} changeContent={changeForm}/>
                                <InputRow label="Thesis Template Files :" value={thesisFormContent.templateFiles} field="templateFiles" error={thesisFormError.templateFiles} changeContent={changeForm}/>
                                <InputRow label="Thesis Submission Deadline :" value={thesisFormContent.submissionDeadline} field="submissionDeadline" type="date" error={thesisFormError.submissionDeadline} changeContent={changeForm}/>
                            </>
                        }
                        <div className="form-button-area">
                            <button className="form-add-button" onClick={submitForm}>{isAdd ? "Add" : "Update"}</button>
                            <button className="form-cancel-button" onClick={cancelForm}>Cancel</button>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="table">
                <div className="table-title">Thesis Table</div>
                <table className="table-content">
                    <thead>
                        <tr>
                            <th style={{paddingLeft:"1%"}}>
                                <input 
                                    type="text" 
                                    name="thesis_id" 
                                    value={thesisListSearch.id} 
                                    onChange={(e) => changeSearch("id", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="thesis_topic" 
                                    value={thesisListSearch.topic} 
                                    onChange={(e) => changeSearch("topic", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="thesis_sup1" 
                                    value={thesisListSearch.sup1} 
                                    onChange={(e) => changeSearch("sup1", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="thesis_sup2" 
                                    value={thesisListSearch.sup2} 
                                    onChange={(e) => changeSearch("sup2", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="thesis_slot" 
                                    value={thesisListSearch.slot} 
                                    onChange={(e) => changeSearch("slot", e.target.value)}>
                                </input>
                            </th>
                            <th>
                                <input 
                                    type="text" 
                                    name="thesis_slot_max" 
                                    value={thesisListSearch.slotMax} 
                                    onChange={(e) => changeSearch("slotMax", e.target.value)}>
                                </input>
                            </th>
                            <th style={{paddingRight:"1%"}}>
                                <button className="search-button" onClick={search}>Search</button>
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Topic</th>
                            <th>Supervisor 1</th>
                            <th>Supervisor 2</th>
                            <th>Slot</th>
                            <th>Maximum Slot</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {thesisList.map((thesis) => {
                            return (
                                <tr key={thesis.thesis_id}>
                                    <td>{thesis.thesis_id}</td>
                                    <td>{thesis.thesis_topic}</td>
                                    <td>{thesis.lecturer1_id}</td>
                                    <td>{thesis.lecturer2_id}</td>
                                    <td>{thesis.slot}</td>
                                    <td>{thesis.slot_maximum}</td>
                                    <td className="icon-column">
                                        <img className="icon delete_icon" src={delete_icon} alt="delete_icon" onClick={() => deleteRow(thesis.thesis_id)}/>
                                        <img className="icon" src={detail_icon} alt="detail_icon"/>
                                        <img className="icon" src={change_icon} onClick={() => editRow(thesis.thesis_id)} alt="change_icon"/> 
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

export default ThesisTable;