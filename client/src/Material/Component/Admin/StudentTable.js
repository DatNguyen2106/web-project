import React, { useEffect, useState }  from "react";
import Axios from "axios";
import "../../Style/Admin/LecturerTable.css";
import PaginationBar from "../PaginationBar";
import InputRow from "../InputRow.js";
import detail_icon from '../../Images/detail_icon.png';
import change_icon from '../../Images/change_icon.png';
import delete_icon from '../../Images/delete_icon.png';
const StudentTable = () => {
    const defaultForm = {
        id: "", 
        userName: "", 
        fullName: "", 
        email: "", 
        intake: "", 
        ects: "",
        registrationBachelorThesis: {
            matriculationNumber: "",
            surname: "",
            forename: "",
            dateOfBirth: "",
            placeOfBirth: "",
            thesisTitle: "",
            thesisType: "",
            furtherParticipants: "",
            titleSup1: "",
            dateSup1: "",
            titleSup2: "",
            dateSup2: "",
            issued: "",
            deadlineCopy: "",
            grantedExtension: "",
            chairmanOfExamination: "",
            dateOfIssue: "",
        },
        assessmentBachelorThesis: {
            matriculationNumber: "",
            surname: "",
            forename: "",
            thesisType: "",
            furtherParticipants: "",
            titleSup1: "",
            gradeSup1: "",
            titleSup2: "",
            gradeSup2: "",
            assessmentDescription: "",
            assessmentDate: "",
        },
        registrationOralDefense: {
            matriculationNumber: "",
            surname: "",
            forename: "",
            titleSup1: "",
            titleSup2: "",
            areSpectatorsAllowed: "",
            weekday: "",
            proposedDate: "",
            proposedTime: "",
            room: "",
            haveThoseAgreed: "",
            receivedDate: "",
            admissionDate: "",
        },
        assessmentOralDefense: {
            matriculationNumber: "",
            surname: "",
            forename: "",
            defenseDay: "",
            defensePlace: "",
            startDate: "",
            finishDate: "",
            isHealthSufficient: "",
            titleSup1: "",
            gradeSup1: "",
            titleSup2: "",
            gradeSup2: "",
            record: "",
            assessmentDate: "",
        }
    }
    const [reload, setReload] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [studentFormContent, setStudentFormContent] = useState({...defaultForm});
    const [studentFormError, setStudentFormError] = useState({...defaultForm});
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

    const changeInnerForm = (field1, field2, value) => {
        setStudentFormContent({
            ...studentFormContent,
            [field1]:{
                ...studentFormContent[field1],
                [field2]: value
            }
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
        let formError = {...defaultForm};
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
        }else if(!/^-?\d+$/.test(studentFormContent.intake)){
            formError.intake = "Intake must be a number"
        }
        if(isAdd){
            if(!studentFormContent.ects){
                formError.ects = "ECTS cannot be empty"
            }else if(!/^-?\d+$/.test(studentFormContent.ects)){
                formError.ects = "ECTS must be a number"
            }
        }
        // if(studentFormContent.registrationBachelorThesis.furtherParticipants && !/^-?\d+$/.test(studentFormContent.registrationBachelorThesis.furtherParticipants)){
        //     formError.registrationBachelorThesis.furtherParticipants = "Further Participants must be a number"
        // }
        setStudentFormError(formError);
    }

    useEffect(() => {
        validateForm();
    }, [studentFormContent]);

    const submitForm = (extraURL) => {
        if (studentFormError.id === "" && studentFormError.userName === "" && studentFormError.fullName === "" && studentFormError.email === "" && studentFormError.intake === "" && studentFormError.ects === ""){
            let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
            let body = {
                username: studentFormContent.userName,
                fullname: studentFormContent.fullName,
                email: studentFormContent.email,
                intake: studentFormContent.intake,
                ects: studentFormContent.ects
            }
            if(isAdd){
                body = {
                    id: parseInt(studentFormContent.id),
                    username: studentFormContent.userName,
                    fullname: studentFormContent.fullName,
                    email: studentFormContent.email,
                    intake: studentFormContent.intake,
                    ects: studentFormContent.ects
                }
            }else{
                if(extraURL === "/registrationBachelorThesis"){
                    body = {
                        surName: studentFormContent.registrationBachelorThesis.surname,
                        foreName: studentFormContent.registrationBachelorThesis.forename,
                        dateOfBirth: studentFormContent.registrationBachelorThesis.dateOfBirth,
                        placeOfBirth: studentFormContent.registrationBachelorThesis.placeOfBirth,
                        titleBachelorThesis: studentFormContent.registrationBachelorThesis.thesisTitle,
                        thesisType: studentFormContent.registrationBachelorThesis.thesisType,
                        furtherParticipants: studentFormContent.registrationBachelorThesis.furtherParticipants,
                        supervisor1_title: studentFormContent.registrationBachelorThesis.titleSup1,
                        supervisor1_date: studentFormContent.registrationBachelorThesis.dateSup1,
                        supervisor2_title: studentFormContent.registrationBachelorThesis.titleSup2,
                        supervisor2_date: studentFormContent.registrationBachelorThesis.dateSup2,
                        issued: studentFormContent.registrationBachelorThesis.issued,
                        deadlineCopy: studentFormContent.registrationBachelorThesis.deadlineCopy,
                        extensionGranted: studentFormContent.registrationBachelorThesis.grantedExtension,
                        chairmanOfExamination: studentFormContent.registrationBachelorThesis.chairmanOfExamination,
                        dateOfIssue: studentFormContent.registrationBachelorThesis.dateOfIssue,
                    }
                }else if(extraURL === "/registrationOralDefense"){
                    body = {
                        surName: studentFormContent.registrationOralDefense.surname,
                        foreName: studentFormContent.registrationOralDefense.forename,
                        supervisor1_title: studentFormContent.registrationOralDefense.titleSup1,
                        supervisor2_title: studentFormContent.registrationOralDefense.titleSup2,
                        spectatorsPresent: studentFormContent.registrationOralDefense.areSpectatorsAllowed,
                        weekDate: studentFormContent.registrationOralDefense.weekday,
                        proposedDate: studentFormContent.registrationOralDefense.proposedDate,
                        proposedTime: studentFormContent.registrationOralDefense.proposedTime,
                        room: studentFormContent.registrationOralDefense.room,
                        concernedAgreed: studentFormContent.registrationOralDefense.haveThoseAgreed,
                        dateReceive: studentFormContent.registrationOralDefense.receivedDate,
                        dateSubmission: studentFormContent.registrationOralDefense.admissionDate,
                    }
                }else if(extraURL === "/assessmentBachelorThesis"){
                    body = {
                        surName: studentFormContent.assessmentBachelorThesis.surname,
                        foreName: studentFormContent.assessmentBachelorThesis.forename,
                        thesisType: studentFormContent.assessmentBachelorThesis.thesisType,
                        furtherParticipants: studentFormContent.assessmentBachelorThesis.furtherParticipants,
                        supervisor1_title: studentFormContent.assessmentBachelorThesis.titleSup1,
                        supervisor1_grade: studentFormContent.assessmentBachelorThesis.gradeSup1,
                        supervisor2_title: studentFormContent.assessmentBachelorThesis.titleSup2,
                        supervisor2_grade: studentFormContent.assessmentBachelorThesis.gradeSup2,
                        assessmentThesis: studentFormContent.assessmentBachelorThesis.assessmentDescription,
                        assessmentDate: studentFormContent.assessmentBachelorThesis.assessmentDate,
                    }
                }else if(extraURL === "/assessmentOralDefense"){
                    body = {
                        surName: studentFormContent.assessmentOralDefense.surname,
                        foreName: studentFormContent.assessmentOralDefense.forename,
                        dateDefense: studentFormContent.assessmentOralDefense.defenseDay,
                        placeDefense: studentFormContent.assessmentOralDefense.defensePlace,
                        startDate: studentFormContent.assessmentOralDefense.startDate,
                        finishDate: studentFormContent.assessmentOralDefense.finishDate,
                        stateOfHealth: studentFormContent.assessmentOralDefense.isHealthSufficient,
                        supervisor1_title: studentFormContent.assessmentOralDefense.titleSup1,
                        supervisor1_grade: studentFormContent.assessmentOralDefense.gradeSup1,
                        supervisor2_title: studentFormContent.assessmentOralDefense.titleSup2,
                        supervisor2_grade: studentFormContent.assessmentOralDefense.gradeSup2,
                        record: studentFormContent.assessmentOralDefense.record,
                        assessmentDate: studentFormContent.assessmentOralDefense.assessmentDate,
                    }
                }else{
                    body = {
                        username: studentFormContent.userName,
                        fullname: studentFormContent.fullName,
                        email: studentFormContent.email,
                        intake: studentFormContent.intake,
                        ects: studentFormContent.ects
                    }
                }
            }
            if(isAdd) {body.id = parseInt(studentFormContent.id)}
            let url = isAdd ? `http://localhost:5000/admin/add/student` : `http://localhost:5000/admin/update/student/${studentFormContent.id}${extraURL}`
            let method = isAdd ? "post" : "put"
            Axios[method](url, body, config).then((response)=>{
                setIsAdd(true)
                setStudentFormContent({...defaultForm})
                setStudentFormError({...defaultForm})
                setReload(!reload)
            }).catch(e => {
                console.log(e);
            });
        }
    };

    const cancelForm = () => {
        setStudentFormContent({...defaultForm})
        setStudentFormError({...defaultForm})
        setIsAdd(true);
    }

    const editRow = (id) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios
            .get(`http://localhost:5000/admin/get/student/${id}`, config)
            .then((res)=>{
                setStudentFormContent({
                    id: res.data.studentResults[0].student_id, 
                    userName: res.data.studentResults[0].student_user_name, 
                    fullName: res.data.studentResults[0].fullname, 
                    email: res.data.studentResults[0].email, 
                    intake: res.data.studentResults[0].intake, 
                    ects: res.data.studentResults[0].ects,
                    registrationBachelorThesis: {
                        matriculationNumber: res.data.registrationBachelorThesisResults[0]?.matriculation_number,
                        surname: res.data.registrationBachelorThesisResults[0]?.surname,
                        forename: res.data.registrationBachelorThesisResults[0]?.forename,
                        dateOfBirth: res.data.registrationBachelorThesisResults[0]?.date_of_birth ? new Date(res.data.registrationBachelorThesisResults[0]?.date_of_birth).toLocaleDateString("fr-CA") : "",
                        placeOfBirth: res.data.registrationBachelorThesisResults[0]?.place_of_birth,
                        thesisTitle: res.data.registrationBachelorThesisResults[0]?.title_bachelor_thesis,
                        thesisType: res.data.registrationBachelorThesisResults[0]?.thesis_type,
                        furtherParticipants: res.data.registrationBachelorThesisResults[0]?.further_participants,
                        titleSup1: res.data.registrationBachelorThesisResults[0]?.supervisor1_title,
                        dateSup1: res.data.registrationBachelorThesisResults[0]?.supervisor1_date ? new Date(res.data.registrationBachelorThesisResults[0]?.supervisor1_date).toLocaleDateString("fr-CA") : "",
                        titleSup2: res.data.registrationBachelorThesisResults[0]?.supervisor2_title,
                        dateSup2: res.data.registrationBachelorThesisResults[0]?.supervisor2_date ? new Date(res.data.registrationBachelorThesisResults[0]?.supervisor2_date).toLocaleDateString("fr-CA") : "",
                        issued: res.data.registrationBachelorThesisResults[0]?.issued ? new Date(res.data.registrationBachelorThesisResults[0]?.issued).toLocaleDateString("fr-CA") : "",
                        deadlineCopy: res.data.registrationBachelorThesisResults[0]?.deadline_copy,
                        grantedExtension: res.data.registrationBachelorThesisResults[0]?.extension_granted ? new Date(res.data.registrationBachelorThesisResults[0]?.extension_granted).toLocaleDateString("fr-CA") : "",
                        chairmanOfExamination: res.data.registrationBachelorThesisResults[0]?.chairman_of_examination,
                        dateOfIssue: res.data.registrationBachelorThesisResults[0]?.date_of_issue ? new Date(res.data.registrationBachelorThesisResults[0]?.date_of_issue).toLocaleDateString("fr-CA") : "",
                    },
                    assessmentBachelorThesis: {
                        matriculationNumber: res.data.assessmentBachelorThesisResults[0]?.matriculation_number,
                        surname: res.data.assessmentBachelorThesisResults[0]?.surname,
                        forename: res.data.assessmentBachelorThesisResults[0]?.forename,
                        thesisType: res.data.assessmentBachelorThesisResults[0]?.thesis_type,
                        furtherParticipants: res.data.assessmentBachelorThesisResults[0]?.further_participants,
                        titleSup1: res.data.assessmentBachelorThesisResults[0]?.supervisor1_title,
                        gradeSup1: res.data.assessmentBachelorThesisResults[0]?.supervisor1_grade,
                        titleSup2: res.data.assessmentBachelorThesisResults[0]?.supervisor2_title,
                        gradeSup2: res.data.assessmentBachelorThesisResults[0]?.supervisor2_grade,
                        assessmentDescription: res.data.assessmentBachelorThesisResults[0]?.assessment_thesis,
                        assessmentDate: res.data.assessmentBachelorThesisResults[0]?.assessment_date ? new Date(res.data.assessmentBachelorThesisResults[0]?.assessment_date).toLocaleDateString("fr-CA") : "",
                    },
                    registrationOralDefense: {
                        matriculationNumber: res.data.registrationOralDefenseResults[0]?.matriculation_number,
                        surname: res.data.registrationOralDefenseResults[0]?.surname,
                        forename: res.data.registrationOralDefenseResults[0]?.forename,
                        titleSup1: res.data.registrationOralDefenseResults[0]?.supervisor1_title,
                        titleSup2: res.data.registrationOralDefenseResults[0]?.supervisor2_title,
                        areSpectatorsAllowed: res.data.registrationOralDefenseResults[0]?.spectators_present,
                        weekday: res.data.registrationOralDefenseResults[0]?.weekdate,
                        proposedDate: res.data.registrationOralDefenseResults[0]?.proposed_date ? new Date(res.data.registrationOralDefenseResults[0]?.proposed_date).toLocaleDateString("fr-CA") : "",
                        proposedTime: res.data.registrationOralDefenseResults[0]?.proposed_time,
                        room: res.data.registrationOralDefenseResults[0]?.room,
                        haveThoseAgreed: res.data.registrationOralDefenseResults[0]?.concerned_agreed,
                        receivedDate: res.data.registrationOralDefenseResults[0]?.date_receive ? new Date(res.data.registrationOralDefenseResults[0]?.date_receive).toLocaleDateString("fr-CA") : "",
                        admissionDate: res.data.registrationOralDefenseResults[0]?.date_submission ? new Date(res.data.registrationOralDefenseResults[0]?.date_submission).toLocaleDateString("fr-CA") : "",
                    },
                    assessmentOralDefense: {
                        matriculationNumber: res.data.assessmentOralDefenseResults[0]?.matriculation_number,
                        surname: res.data.assessmentOralDefenseResults[0]?.surname,
                        forename: res.data.assessmentOralDefenseResults[0]?.forename,
                        defenseDay: res.data.assessmentOralDefenseResults[0]?.date_defense ? new Date(res.data.assessmentOralDefenseResults[0]?.date_defense).toLocaleDateString("fr-CA") : "",
                        defensePlace: res.data.assessmentOralDefenseResults[0]?.place_defense,
                        startDate: res.data.assessmentOralDefenseResults[0]?.start_date ? new Date(res.data.assessmentOralDefenseResults[0]?.start_date).toLocaleDateString("fr-CA") : "",
                        finishDate: res.data.assessmentOralDefenseResults[0]?.finish_date ? new Date(res.data.assessmentOralDefenseResults[0]?.finish_date).toLocaleDateString("fr-CA") : "",
                        isHealthSufficient: res.data.assessmentOralDefenseResults[0]?.state_of_health,
                        titleSup1: res.data.assessmentOralDefenseResults[0]?.supervisor1_title,
                        gradeSup1: res.data.assessmentOralDefenseResults[0]?.supervisor1_grade,
                        titleSup2: res.data.assessmentOralDefenseResults[0]?.supervisor2_title,
                        gradeSup2: res.data.assessmentOralDefenseResults[0]?.supervisor2_grade,
                        record: res.data.assessmentOralDefenseResults[0]?.record,
                        assessmentDate: res.data.assessmentOralDefenseResults[0]?.assessment_date ? new Date(res.data.assessmentOralDefenseResults[0]?.assessment_date).toLocaleDateString("fr-CA") : "",
                    }
                })
                setIsAdd(false);
                setOpenForm(true);
            })
            .catch((e)=>{
                console.log(e)
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
                        {
                            isAdd ?
                            <>
                                <InputRow label="Student ID :" value={studentFormContent.id} field="id" error={studentFormError.id} changeContent={changeForm}/>
                                <InputRow label="Student User Name :" value={studentFormContent.userName} field="userName" error={studentFormError.userName} changeContent={changeForm}/>
                                <InputRow label="Student Full Name :" value={studentFormContent.fullName} field="fullName" error={studentFormError.fullName} changeContent={changeForm}/>
                                <InputRow label="Student Email :" value={studentFormContent.email} field="email" error={studentFormError.email} changeContent={changeForm}/>
                                <InputRow label="Student Intake :" value={studentFormContent.intake} field="intake" error={studentFormError.intake} changeContent={changeForm}/>
                                <InputRow label="Student ECTS :" value={studentFormContent.ects} field="ects" error={studentFormError.ects} changeContent={changeForm}/>
                                <div className="form-button-area">
                                    <button className="form-add-button" onClick={()=>submitForm("")}>Add</button>
                                    <button className="form-cancel-button" onClick={cancelForm}>Cancel</button>
                                </div>
                            </> :
                            <>
                                <InputRow label="Student ID :" value={studentFormContent.id} isDisabled="disabled"/>
                                <InputRow label="Student User Name :" value={studentFormContent.userName} field="userName" error={studentFormError.userName} changeContent={changeForm}/>
                                <InputRow label="Student Full Name :" value={studentFormContent.fullName} field="fullName" error={studentFormError.fullName} changeContent={changeForm}/>
                                <InputRow label="Student Email :" value={studentFormContent.email} field="email" error={studentFormError.email} changeContent={changeForm}/>
                                <InputRow label="Student Intake :" value={studentFormContent.intake} field="intake" error={studentFormError.intake} changeContent={changeForm}/>
                                <InputRow label="Student ECTS :" value={studentFormContent.ects} field="ects" error={studentFormError.ects} changeContent={changeForm}/>
                                <div className="form-button-area">
                                    <button className="form-add-button" onClick={()=>submitForm("")}>Update</button>
                                    <button className="form-cancel-button" onClick={cancelForm}>Cancel</button>
                                </div>
                                <br/><hr/>
                                <h3>Registration Of Bachelor Thesis</h3>
                                <InputRow label="Student ID :" value={studentFormContent.id} isDisabled="disabled"/>
                                <InputRow label="Student Matriculation Number :" value={studentFormContent.registrationBachelorThesis.matriculationNumber} isDisabled="disabled" />
                                <InputRow label="Student Surname :" value={studentFormContent.registrationBachelorThesis.surname} field1="registrationBachelorThesis" field2="surname" error={studentFormError.registrationBachelorThesis.surname} changeContent={changeInnerForm}/>
                                <InputRow label="Student Forename :" value={studentFormContent.registrationBachelorThesis.forename} field1="registrationBachelorThesis" field2="forename" error={studentFormError.registrationBachelorThesis.forename} changeContent={changeInnerForm}/>
                                <InputRow label="Student Date Of Birth :" value={studentFormContent.registrationBachelorThesis.dateOfBirth} type="date" field1="registrationBachelorThesis" field2="dateOfBirth" error={studentFormError.registrationBachelorThesis.dateOfBirth} changeContent={changeInnerForm}/>
                                <InputRow label="Student Place Of Birth :" value={studentFormContent.registrationBachelorThesis.placeOfBirth} field1="registrationBachelorThesis" field2="placeOfBirth" error={studentFormError.registrationBachelorThesis.placeOfBirth} changeContent={changeInnerForm}/>
                                <InputRow label="Thesis Title :" value={studentFormContent.registrationBachelorThesis.thesisTitle} field1="registrationBachelorThesis" field2="thesisTitle" error={studentFormError.registrationBachelorThesis.thesisTitle} changeContent={changeInnerForm}/>
                                <InputRow label="Individual Or Group Study :" type="select" listContent={[{key: "0", label: "Individual"}, {key: "1", label: "Group"}]} defaultValue={studentFormContent.registrationBachelorThesis.thesisType||studentFormContent.registrationBachelorThesis.thesisType==='0' ? studentFormContent.registrationBachelorThesis.thesisType : ""} field1="registrationBachelorThesis" field2="thesisType" error={studentFormError.registrationBachelorThesis.thesisType} changeContent={changeInnerForm}/>
                                <InputRow label="Further Participants :" value={studentFormContent.registrationBachelorThesis.furtherParticipants} field1="registrationBachelorThesis" field2="furtherParticipants" error={studentFormError.registrationBachelorThesis.furtherParticipants} changeContent={changeInnerForm}/>
                                <InputRow label="Assessor :" value={studentFormContent.registrationBachelorThesis.titleSup1} field1="registrationBachelorThesis" field2="titleSup1" error={studentFormError.registrationBachelorThesis.titleSup1} changeContent={changeInnerForm}/>
                                <InputRow label="Date From Assessor :" value={studentFormContent.registrationBachelorThesis.dateSup1} type="date"  field1="registrationBachelorThesis" field2="dateSup1" error={studentFormError.registrationBachelorThesis.dateSup1} changeContent={changeInnerForm}/>
                                <InputRow label="Co-Assessor :" value={studentFormContent.registrationBachelorThesis.titleSup2} field1="registrationBachelorThesis" field2="titleSup2" error={studentFormError.registrationBachelorThesis.titleSup2} changeContent={changeInnerForm}/>
                                <InputRow label="Date From Co-Assessor :" value={studentFormContent.registrationBachelorThesis.dateSup2} type="date"  field1="registrationBachelorThesis" field2="dateSup2" error={studentFormError.registrationBachelorThesis.dateSup2} changeContent={changeInnerForm}/>
                                <InputRow label="Issued :" value={studentFormContent.registrationBachelorThesis.issued} type="date" field1="registrationBachelorThesis" field2="issued" error={studentFormError.registrationBachelorThesis.issued} changeContent={changeInnerForm}/>
                                <InputRow label="Deadline For Digital Copy :" value={studentFormContent.registrationBachelorThesis.deadlineCopy} field1="registrationBachelorThesis" field2="deadlineCopy" error={studentFormError.registrationBachelorThesis.deadlineCopy} changeContent={changeInnerForm}/>
                                <InputRow label="Extension Granted Until :" value={studentFormContent.registrationBachelorThesis.grantedExtension} type="date" field1="registrationBachelorThesis" field2="grantedExtension" error={studentFormError.registrationBachelorThesis.grantedExtension} changeContent={changeInnerForm}/>
                                <InputRow label="Chairman Of Examinations Board :" value={studentFormContent.registrationBachelorThesis.chairmanOfExamination} field1="registrationBachelorThesis" field2="chairmanOfExamination" error={studentFormError.registrationBachelorThesis.chairmanOfExamination} changeContent={changeInnerForm}/>
                                <InputRow label="Date Of Issue :" value={studentFormContent.registrationBachelorThesis.dateOfIssue} type="date" field1="registrationBachelorThesis" field2="dateOfIssue" error={studentFormError.registrationBachelorThesis.dateOfIssue} changeContent={changeInnerForm}/>
                                <div className="form-button-area">
                                    <button className="form-add-button" onClick={()=>submitForm("/registrationBachelorThesis")}>Update</button>
                                    <button className="form-cancel-button" onClick={cancelForm}>Cancel</button>
                                </div>
                                <br/><hr/>
                                <h3>Registration Of Oral Defense</h3>
                                <InputRow label="Student ID :" value={studentFormContent.id} isDisabled="disabled"/>
                                <InputRow label="Student Matriculation Number :" value={studentFormContent.registrationOralDefense.matriculationNumber} isDisabled="disabled" />
                                <InputRow label="Student Surname :" value={studentFormContent.registrationOralDefense.surname} field1="registrationOralDefense" field2="surname" error={studentFormError.registrationOralDefense.surname} changeContent={changeInnerForm}/>
                                <InputRow label="Student Forename :" value={studentFormContent.registrationOralDefense.forename} field1="registrationOralDefense" field2="forename" error={studentFormError.registrationOralDefense.forename} changeContent={changeInnerForm}/>
                                <InputRow label="First Examiner :" value={studentFormContent.registrationOralDefense.titleSup1} field1="registrationOralDefense" field2="titleSup1" error={studentFormError.registrationOralDefense.titleSup1} changeContent={changeInnerForm}/>
                                <InputRow label="Second Examiner :" value={studentFormContent.registrationOralDefense.titleSup2} field1="registrationOralDefense" field2="titleSup2" error={studentFormError.registrationOralDefense.titleSup2} changeContent={changeInnerForm}/>
                                <InputRow label="Are spectators allowed to be present :" type="select" listContent={[{key: "0", label: "No"}, {key: "1", label: "Yes"}]} defaultValue={studentFormContent.registrationOralDefense.areSpectatorsAllowed||studentFormContent.registrationOralDefense.areSpectatorsAllowed==='0' ? studentFormContent.registrationOralDefense.areSpectatorsAllowed : ""} field1="registrationOralDefense" field2="areSpectatorsAllowed" error={studentFormError.registrationOralDefense.areSpectatorsAllowed} changeContent={changeInnerForm}/>
                                <InputRow label="Weekday :" type="select" listContent={[{key: "0", label: "Monday"}, {key: "1", label: "Tuesday"}, {key: "2", label: "Wednesday"}, {key: "3", label: "Thursday"}, {key: "4", label: "Friday"}, {key: "5", label: "Saturday"}, {key: "6", label: "Sunday"}]} defaultValue={studentFormContent.registrationOralDefense.weekday||studentFormContent.registrationOralDefense.weekday==='0' ? studentFormContent.registrationOralDefense.weekday : ""} field1="registrationOralDefense" field2="weekday" error={studentFormError.registrationOralDefense.weekday} changeContent={changeInnerForm}/>
                                <InputRow label="Date :" value={studentFormContent.registrationOralDefense.proposedDate} type="date" field1="registrationOralDefense" field2="proposedDate" error={studentFormError.registrationOralDefense.proposedDate} changeContent={changeInnerForm}/>
                                <InputRow label="Time :" value={studentFormContent.registrationOralDefense.proposedTime} field1="registrationOralDefense" field2="proposedTime" error={studentFormError.registrationOralDefense.proposedTime} changeContent={changeInnerForm}/>
                                <InputRow label="Room :" value={studentFormContent.registrationOralDefense.room} field1="registrationOralDefense" field2="room" error={studentFormError.registrationOralDefense.room} changeContent={changeInnerForm}/>
                                <InputRow label="Have those concerned agreed :" type="select" listContent={[{key: "0", label: "No"}, {key: "1", label: "Yes"}]} defaultValue={studentFormContent.registrationOralDefense.haveThoseAgreed||studentFormContent.registrationOralDefense.haveThoseAgreed==='0' ? studentFormContent.registrationOralDefense.haveThoseAgreed : ""} field1="registrationOralDefense" field2="haveThoseAgreed" error={studentFormError.registrationOralDefense.haveThoseAgreed} changeContent={changeInnerForm}/>
                                <InputRow label="Date received :" value={studentFormContent.registrationOralDefense.receivedDate} type="date" field1="registrationOralDefense" field2="receivedDate" error={studentFormError.registrationOralDefense.receivedDate} changeContent={changeInnerForm}/>
                                <InputRow label="Date of admission :" value={studentFormContent.registrationOralDefense.admissionDate} type="date" field1="registrationOralDefense" field2="admissionDate" error={studentFormError.registrationOralDefense.admissionDate} changeContent={changeInnerForm}/>
                                <div className="form-button-area">
                                    <button className="form-add-button" onClick={()=>submitForm("/registrationOralDefense")}>Update</button>
                                    <button className="form-cancel-button" onClick={cancelForm}>Cancel</button>
                                </div>
                                <br/><hr/>
                                <h3>Assessment Of Bachelor Thesis</h3>
                                <InputRow label="Student ID :" value={studentFormContent.id} isDisabled="disabled"/>
                                <InputRow label="Student Matriculation Number :" value={studentFormContent.assessmentBachelorThesis.matriculationNumber} isDisabled="disabled" />
                                <InputRow label="Student Surname :" value={studentFormContent.assessmentBachelorThesis.surname} field1="assessmentBachelorThesis" field2="surname" error={studentFormError.assessmentBachelorThesis.surname} changeContent={changeInnerForm}/>
                                <InputRow label="Student Forename :" value={studentFormContent.assessmentBachelorThesis.forename} field1="assessmentBachelorThesis" field2="forename" error={studentFormError.assessmentBachelorThesis.forename} changeContent={changeInnerForm}/>
                                <InputRow label="Individual Or Group Study :" type="select" listContent={[{key: "0", label: "Individual"}, {key: "1", label: "Group"}]} defaultValue={studentFormContent.assessmentBachelorThesis.thesisType||studentFormContent.assessmentBachelorThesis.thesisType==='0' ? studentFormContent.assessmentBachelorThesis.thesisType : ""} field1="assessmentBachelorThesis" field2="thesisType" error={studentFormError.assessmentBachelorThesis.thesisType} changeContent={changeInnerForm}/>
                                <InputRow label="Further Participants :" value={studentFormContent.assessmentBachelorThesis.furtherParticipants} field1="assessmentBachelorThesis" field2="furtherParticipants" error={studentFormError.assessmentBachelorThesis.furtherParticipants} changeContent={changeInnerForm}/>
                                <InputRow label="First Examiner's Name :" value={studentFormContent.assessmentBachelorThesis.titleSup1} field1="assessmentBachelorThesis" field2="titleSup1" error={studentFormError.assessmentBachelorThesis.titleSup1} changeContent={changeInnerForm}/>
                                <InputRow label="First Examiner's Grade :" value={studentFormContent.assessmentBachelorThesis.gradeSup1} field1="assessmentBachelorThesis" field2="gradeSup1" error={studentFormError.assessmentBachelorThesis.gradeSup1} changeContent={changeInnerForm}/>
                                <InputRow label="Second Examiner's Name :" value={studentFormContent.assessmentBachelorThesis.titleSup2} field1="assessmentBachelorThesis" field2="titleSup2" error={studentFormError.assessmentBachelorThesis.titleSup2} changeContent={changeInnerForm}/>
                                <InputRow label="Second Examiner's Grade :" value={studentFormContent.assessmentBachelorThesis.gradeSup2} field1="assessmentBachelorThesis" field2="gradeSup2" error={studentFormError.assessmentBachelorThesis.gradeSup2} changeContent={changeInnerForm}/>
                                <InputRow label="Assessment of the bachelor thesis :" value={studentFormContent.assessmentBachelorThesis.assessmentDescription} field1="assessmentBachelorThesis" field2="assessmentDescription" error={studentFormError.assessmentBachelorThesis.assessmentDescription} changeContent={changeInnerForm}/>
                                <InputRow label="Assessment Date :" value={studentFormContent.assessmentBachelorThesis.assessmentDate} type="date" field1="assessmentBachelorThesis" field2="assessmentDate" error={studentFormError.assessmentBachelorThesis.assessmentDate} changeContent={changeInnerForm}/>
                                <div className="form-button-area">
                                    <button className="form-add-button" onClick={()=>submitForm("/assessmentBachelorThesis")}>Update</button>
                                    <button className="form-cancel-button" onClick={cancelForm}>Cancel</button>
                                </div>
                                <br/><hr/>
                                <h3>Assessment Of Oral Defense</h3>
                                <InputRow label="Student ID :" value={studentFormContent.id} isDisabled="disabled"/>
                                <InputRow label="Student Matriculation Number :" value={studentFormContent.assessmentOralDefense.matriculationNumber} isDisabled="disabled" />
                                <InputRow label="Student Surname :" value={studentFormContent.assessmentOralDefense.surname} field1="assessmentOralDefense" field2="surname" error={studentFormError.assessmentOralDefense.surname} changeContent={changeInnerForm}/>
                                <InputRow label="Student Forename :" value={studentFormContent.assessmentOralDefense.forename} field1="assessmentOralDefense" field2="forename" error={studentFormError.assessmentOralDefense.forename} changeContent={changeInnerForm}/>
                                <InputRow label="Date :" value={studentFormContent.assessmentOralDefense.defenseDay} type="date" field1="assessmentOralDefense" field2="defenseDay" error={studentFormError.assessmentOralDefense.defenseDay} changeContent={changeInnerForm}/>
                                <InputRow label="Place :" value={studentFormContent.assessmentOralDefense.defensePlace} field1="assessmentOralDefense" field2="defensePlace" error={studentFormError.assessmentOralDefense.defensePlace} changeContent={changeInnerForm}/>
                                <InputRow label="Start :" value={studentFormContent.assessmentOralDefense.startDate} type="date" field1="assessmentOralDefense" field2="startDate" error={studentFormError.assessmentOralDefense.startDate} changeContent={changeInnerForm}/>
                                <InputRow label="Finish :" value={studentFormContent.assessmentOralDefense.finishDate} type="date" field1="assessmentOralDefense" field2="finishDate" error={studentFormError.assessmentOralDefense.finishDate} changeContent={changeInnerForm}/>
                                <InputRow label="Is the candidate health-sufficient :" type="select" listContent={[{key: "0", label: "No"}, {key: "1", label: "Yes"}]} defaultValue={studentFormContent.assessmentOralDefense.isHealthSufficient||studentFormContent.assessmentOralDefense.isHealthSufficient==='0' ? studentFormContent.assessmentOralDefense.isHealthSufficient : ""} field1="assessmentOralDefense" field2="isHealthSufficient" error={studentFormError.assessmentOralDefense.isHealthSufficient} changeContent={changeInnerForm}/>
                                <InputRow label="First Examiner's Name :" value={studentFormContent.assessmentOralDefense.titleSup1} field1="assessmentOralDefense" field2="titleSup1" error={studentFormError.assessmentOralDefense.titleSup1} changeContent={changeInnerForm}/>
                                <InputRow label="First Examiner's Grade :" value={studentFormContent.assessmentOralDefense.gradeSup1} field1="assessmentOralDefense" field2="gradeSup1" error={studentFormError.assessmentOralDefense.gradeSup1} changeContent={changeInnerForm}/>
                                <InputRow label="Second Examiner's Name :" value={studentFormContent.assessmentOralDefense.titleSup2} field1="assessmentOralDefense" field2="titleSup2" error={studentFormError.assessmentOralDefense.titleSup2} changeContent={changeInnerForm}/>
                                <InputRow label="Second Examiner's Grade :" value={studentFormContent.assessmentOralDefense.gradeSup2} field1="assessmentOralDefense" field2="gradeSup2" error={studentFormError.assessmentOralDefense.gradeSup2} changeContent={changeInnerForm}/>
                                <InputRow label="Record :" value={studentFormContent.assessmentOralDefense.record} field1="assessmentOralDefense" field2="record" error={studentFormError.assessmentOralDefense.record} changeContent={changeInnerForm}/>
                                <InputRow label="Date :" value={studentFormContent.assessmentOralDefense.assessmentDate} type="date" field1="assessmentOralDefense" field2="assessmentDate" error={studentFormError.assessmentOralDefense.assessmentDate} changeContent={changeInnerForm}/>
                                <div className="form-button-area">
                                    <button className="form-add-button" onClick={()=>submitForm("/assessmentOralDefense")}>Update</button>
                                    <button className="form-cancel-button" onClick={cancelForm}>Cancel</button>
                                </div>
                            </>
                        }
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