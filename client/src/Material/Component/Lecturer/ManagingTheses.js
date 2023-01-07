import React, { useEffect, useState }  from "react";
import Axios from "axios";
import "../../Style/Admin/LecturerTable.css";
import PaginationBar from "../PaginationBar";
import InputRow from "../InputRow.js";
import detail_icon from '../../Images/detail_icon.png';
import delete_icon from '../../Images/delete_icon.png';
import add_icon from '../../Images/add_icon.png';
const ManagingTheses = (props) => {
    const defaultForm = {
        id: "",
        topic: "",
        field: "",
        slotMax: "",
    }
    const [reload, setReload] = useState(false);
    const [lecturerThesis, setLecturerThesis] = useState({...defaultForm});
    //const [thesisListSearch, setThesisListSearch] = useState({});
    const [thesisList, setThesisList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [openForm, setOpenForm] = React.useState(false);

    useEffect(() => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            page: activePage.toString()
        }
        let url = props.lecturerType.includes("1") ? "http://localhost:5000/lecturer1/get/theses" : "http://localhost:5000/lecturer2/get/theses"
        Axios.post(url, body, config).then((response) => {
            setThesisList(response.data);
            setTotalPage(response.data.totalPage);
            if (activePage > response.data.totalPage) setActivePage(response.data.totalPage);
        });
    }, [reload, activePage]);

    // const changeForm = (field, value) => {
    //     setThesisFormContent({
    //         ...thesisFormContent,
    //         [field]: value
    //     });
    // };

    // const changeSearch = (field, value) => {
    //     setThesisListSearch({
    //         ...thesisListSearch,
    //         [field]: value
    //     });
    // };

    // const search = () => {
    //     setReload(!reload);
    // };

    // const validateForm = () => {
    //     let formError = {...defaultForm};
    //     if(!thesisFormContent.id){
    //         formError.id = "Id cannot be empty"
    //     }else if(!/^-?\d+$/.test(thesisFormContent.id)){
    //         formError.id = "Id must be a number"
    //     }
    //     if(!thesisFormContent.topic){
    //         formError.topic = "Topic cannot be empty"
    //     }
    //     if(!thesisFormContent.field){
    //         formError.field = "Field Name cannot be empty"
    //     }
    //     if(isAdd){
    //         if(!thesisFormContent.idSup1){
    //             formError.idSup1 = "Supervisor 1's ID cannot be empty"
    //         }else if(!/^-?\d+$/.test(thesisFormContent.idSup1)){
    //             formError.idSup1 = "Supervisor 1's ID must be a number"
    //         }
    //     }
    //     if(!thesisFormContent.slotMax){
    //         formError.slotMax = "Slot Maximum cannot be empty"
    //     }else if(!/^-?\d+$/.test(thesisFormContent.slotMax)){
    //         formError.idSup1 = "Slot Maximum must be a number"
    //     }
    //     if(!isAdd){
    //         if(!thesisFormContent.activateRegistration){
    //             formError.activateRegistration = "Activate Registration cannot be empty"
    //         }
    //         if(!thesisFormContent.activateDefense){
    //             formError.activateDefense = "Activate Defense cannot be empty"
    //         }
    //     }
    //     setThesisFormError(formError);
    // }

    // useEffect(() => {
    //     validateForm();
    // }, [thesisFormContent]);

    // const submitForm = () => {
    //     if (thesisFormError.id === "" && thesisFormError.topic === "" && thesisFormError.field === "" && thesisFormError.idSup1 === "" && thesisFormError.slotMax === "" && thesisFormError.activateRegistration === "" && thesisFormError.activateDefense === ""){
    //         let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
    //         let body = {
    //             thesisTopic: thesisFormContent.topic,
    //             thesisField: thesisFormContent.field,
    //             lecturer1_id: thesisFormContent.idSup1,
    //             slotMaximum: thesisFormContent.slotMax,
    //             activateRegistration: thesisFormContent.activateRegistration,
    //             activateDefense: thesisFormContent.activateDefense,
    //             numberOfHardCopies: thesisFormContent.numberHardCopies,
    //             printRequirements: thesisFormContent.printRequirements,
    //             templateFiles: thesisFormContent.templateFiles,
    //             submissionDeadline: thesisFormContent.submissionDeadline,
    //         }
    //         if(isAdd) {body.thesisId = parseInt(thesisFormContent.id)}
    //         let url = isAdd ? `http://localhost:5000/admin/add/thesis` : `http://localhost:5000/admin/update/thesis/${thesisFormContent.id}`
    //         let method = isAdd ? "post" : "put"
    //         Axios[method](url, body, config).then((response)=>{
    //             setIsAdd(true)
    //             setThesisFormContent({...defaultForm})
    //             setThesisFormError({...defaultForm})
    //             setReload(!reload)
    //         }).catch(e => {
    //             console.log("catch");
    //         });
    //     }
    // };

    // const cancelForm = () => {
    //     setThesisFormContent({...defaultForm})
    //     setThesisFormError({...defaultForm})
    //     setIsAdd(true);
    // }

    const deleteRow = (id) => {
        console.log("Delete thesis "+id)
        // let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        // Axios.delete(`http://localhost:5000/admin/delete/thesis/${id}`, config).then((response) => {
        //     setReload(!reload);
        // }).catch(e => {
        //     console.log("catch");
        // });
    };

    const detailRow = (id) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let url = props.lecturerType.includes("1") ? "http://localhost:5000/lecturer1/get/thesis/" : "http://localhost:5000/lecturer2/get/thesis/"
        Axios.get(url+id, config).then((response) => {
            console.log(response.data)
            let curList = []
            for (const i of response.data.list){
                if(i.student_id){
                    curList.push({
                        id: i.student_id,
                        fullName: i.fullname,
                        intake: i.intake,
                        mail: i.email,
                        isConfirmed: i.confirm_sup1===1 ? true : false,
                        registrationBachelorThesis: {
                            step: i.registrationBachelorThesis[0]?.step,
                            matriculationNumber: i.registrationBachelorThesis[0]?.matriculation_number,
                            surname: i.registrationBachelorThesis[0]?.surname,
                            forename: i.registrationBachelorThesis[0]?.forename,
                            dateOfBirth: i.registrationBachelorThesis[0]?.date_of_birth ? new Date(i.registrationBachelorThesis[0]?.date_of_birth).toLocaleDateString("fr-CA") : "",
                            placeOfBirth: i.registrationBachelorThesis[0]?.place_of_birth,
                            thesisTitle: i.registrationBachelorThesis[0]?.title_bachelor_thesis,
                            thesisType: i.registrationBachelorThesis[0]?.thesis_type,
                            furtherParticipants: i.registrationBachelorThesis[0]?.further_participants,
                            titleSup1: i.registrationBachelorThesis[0]?.supervisor1_title,
                            dateSup1: i.registrationBachelorThesis[0]?.supervisor1_date ? new Date(i.registrationBachelorThesis[0]?.supervisor1_date).toLocaleDateString("fr-CA") : "",
                            titleSup2: i.registrationBachelorThesis[0]?.supervisor2_title,
                            dateSup2: i.registrationBachelorThesis[0]?.supervisor2_date ? new Date(i.registrationBachelorThesis[0]?.supervisor2_date).toLocaleDateString("fr-CA") : "",
                            issued: i.registrationBachelorThesis[0]?.issued ? new Date(i.registrationBachelorThesis[0]?.issued).toLocaleDateString("fr-CA") : "",
                            deadlineCopy: i.registrationBachelorThesis[0]?.deadline_copy,
                            grantedExtension: i.registrationBachelorThesis[0]?.extension_granted ? new Date(i.registrationBachelorThesis[0]?.extension_granted).toLocaleDateString("fr-CA") : "",
                            chairmanOfExamination: i.registrationBachelorThesis[0]?.chairman_of_examination,
                            dateOfIssue: i.registrationBachelorThesis[0]?.date_of_issue ? new Date(i.registrationBachelorThesis[0]?.date_of_issue).toLocaleDateString("fr-CA") : "",
                        },
                        registrationOralDefense: {
                            step: i.registrationOralDefenseResults[0]?.step,
                            matriculationNumber: i.registrationOralDefenseResults[0]?.matriculation_number,
                            surname: i.registrationOralDefenseResults[0]?.surname,
                            forename: i.registrationOralDefenseResults[0]?.forename,
                            titleSup1: i.registrationOralDefenseResults[0]?.supervisor1_title,
                            titleSup2: i.registrationOralDefenseResults[0]?.supervisor2_title,
                            areSpectatorsAllowed: i.registrationOralDefenseResults[0]?.spectators_present,
                            weekday: i.registrationOralDefenseResults[0]?.weekdate,
                            proposedDate: i.registrationOralDefenseResults[0]?.proposed_date ? new Date(i.registrationOralDefenseResults[0]?.proposed_date).toLocaleDateString("fr-CA") : "",
                            proposedTime: i.registrationOralDefenseResults[0]?.proposed_time,
                            room: i.registrationOralDefenseResults[0]?.room,
                            haveThoseAgreed: i.registrationOralDefenseResults[0]?.concerned_agreed,
                            receivedDate: i.registrationOralDefenseResults[0]?.date_receive ? new Date(i.registrationOralDefenseResults[0]?.date_receive).toLocaleDateString("fr-CA") : "",
                            admissionDate: i.registrationOralDefenseResults[0]?.date_submission ? new Date(i.registrationOralDefenseResults[0]?.date_submission).toLocaleDateString("fr-CA") : "",
                        },
                    })
                }
            }
            // console.log({
            //     myID: response.data.lecturer_id,
            //     thesisID: response.data.list[0].thesis_id,
            //     topic: response.data.list[0].thesis_topic, 
            //     field: response.data.list[0].thesis_field, 
            //     numOfSlot: response.data.list[0].slot, 
            //     maxOfSlot: response.data.list[0].slot_maximum,
            //     step: response.data.list[0].step, 
            //     sup1: {
            //         id: response.data.list[0].lecturer1_id,
            //         title: response.data.list[0].lecturer1_title,
            //         mail: response.data.list[0].lecturer1_email,
            //     },
            //     sup2: {
            //         id: response.data.list[0].lecturer2_id,
            //         title: response.data.list[0].lecturer2_title,
            //         mail: response.data.list[0].lecturer2_email,
            //         isConfirmed: response.data.list[0].confirm_sup2===1 ? true : false,
            //     },
            //     studentList: curList, //id, fullName, intake, mail, isConfirmed
                
            // })
            setLecturerThesis({
                myID: response.data.lecturer_id,
                thesisID: response.data.list[0].thesis_id,
                topic: response.data.list[0].thesis_topic, 
                field: response.data.list[0].thesis_field, 
                numOfSlot: response.data.list[0].slot, 
                maxOfSlot: response.data.list[0].slot_maximum,
                step: response.data.list[0].step, 
                submissionDeadline: response.data.list[0].submission_deadline ? new Date(response.data.list[0].submission_deadline).toLocaleDateString("fr-CA") : "",
                templateFile: response.data.list[0].template_files,
                numberOfHardCopies: response.data.list[0].number_hard_copies,
                printRequirements: response.data.list[0].print_requirements,
                sup1: {
                    id: response.data.list[0].lecturer1_id,
                    title: response.data.list[0].lecturer1_title,
                    mail: response.data.list[0].lecturer1_email,
                },
                sup2: {
                    id: response.data.list[0].lecturer2_id,
                    title: response.data.list[0].lecturer2_title,
                    mail: response.data.list[0].lecturer2_email,
                    isConfirmed: response.data.list[0].confirm_sup2===1 ? true : false,
                },
                studentList: curList, //id, fullName, intake, mail, isConfirmed
                
            })
            setOpenForm(true);
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

    const renderRegistrationBachelorThesis = () => {
        let items = [];
        lecturerThesis.studentList.map((student) => {
            if (props.lecturerType.includes("1") && lecturerThesis.myID===lecturerThesis.sup1.id){
                if (student.registrationBachelorThesis.step === undefined){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>Not allowed to fill in the form yet</h5>
                    </div>)
                }else if (student.registrationBachelorThesis.step === 0){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>Waiting for the student to fill in the form</h5>
                    </div>)
                }else if(student.registrationBachelorThesis.step === 1){
                    console.log(student)
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>The form is filled in. You can sign in or return the form to the student</h5>
                        {/* <InputRow label="Student ID :" value={id} isDisabled="disabled"/> */}
                        <InputRow label="Student Matriculation Number :" value={student.registrationBachelorThesis.matriculationNumber} isDisabled="disabled" />
                        <InputRow label="Student Surname :" value={student.registrationBachelorThesis.surname} isDisabled="disabled"/>
                        <InputRow label="Student Forename :" value={student.registrationBachelorThesis.forename} isDisabled="disabled"/>
                        <InputRow label="Student Date Of Birth :" value={student.registrationBachelorThesis.dateOfBirth} isDisabled="disabled"/>
                        <InputRow label="Student Place Of Birth :" value={student.registrationBachelorThesis.placeOfBirth} isDisabled="disabled"/>
                        <InputRow label="Thesis Title :" value={student.registrationBachelorThesis.thesisTitle} isDisabled="disabled"/>
                        <InputRow label="Individual Or Group Study :" type="select" listContent={[{key: "0", label: "Individual"}, {key: "1", label: "Group"}]} defaultValue={student.registrationBachelorThesis.thesisType||student.registrationBachelorThesis.thesisType==='0' ? student.registrationBachelorThesis.thesisType : ""} isDisabled="disabled"/>
                        <InputRow label="Further Participants :" value={student.registrationBachelorThesis.furtherParticipants} isDisabled="disabled"/>
                        <InputRow label="Assessor :" value={student.registrationBachelorThesis.titleSup1} isDisabled="disabled"/>
                        <InputRow label="Date From Assessor :" value={student.registrationBachelorThesis.dateSup1} isDisabled="disabled"/>
                        <InputRow label="Co-Assessor :" value={student.registrationBachelorThesis.titleSup2} isDisabled="disabled"/>
                        <InputRow label="Date From Co-Assessor :" value={student.registrationBachelorThesis.dateSup2} isDisabled="disabled"/>
                        <InputRow label="Issued :" value={student.registrationBachelorThesis.issued} isDisabled="disabled"/>
                        <InputRow label="Deadline For Digital Copy :" value={student.registrationBachelorThesis.deadlineCopy} isDisabled="disabled"/>
                        <InputRow label="Extension Granted Until :" value={student.registrationBachelorThesis.grantedExtension} isDisabled="disabled"/>
                        <InputRow label="Chairman Of Examinations Board :" value={student.registrationBachelorThesis.chairmanOfExamination} isDisabled="disabled"/>
                        <InputRow label="Date Of Issue :" value={student.registrationBachelorThesis.dateOfIssue} isDisabled="disabled"/>
                        <div className="form-button-area">
                            <button className="form-add-button" onClick={()=>{signInRegFormAsSup1(student.id, true)}}>Accept</button>
                            <button className="form-cancel-button" onClick={()=>{signInRegFormAsSup1(student.id, false)}}>Reject</button>
                        </div>
                    </div>)
                }else if(student.registrationBachelorThesis.step === 2){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>Waiting for the Supervisor 2 to sign in the form</h5>
                    </div>)
                }else if(student.registrationBachelorThesis.step === 3){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>The form is done.</h5>
                    </div>)
                }
            }else {
                if (student.registrationBachelorThesis.step === undefined){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>Not allowed to fill in the form yet</h5>
                    </div>)
                }else if (student.registrationBachelorThesis.step === 0){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>Waiting for the student to fill in the form</h5>
                    </div>)
                }else if(student.registrationBachelorThesis.step === 1){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>Waiting for the Supervisor 1 to sign in the form</h5>
                    </div>)
                }else if(student.registrationBachelorThesis.step === 2){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>The form is filled in. You can sign in or return the form to the student</h5>
                        {/* <InputRow label="Student ID :" value={id} isDisabled="disabled"/> */}
                        <InputRow label="Student Matriculation Number :" value={student.registrationBachelorThesis.matriculationNumber} isDisabled="disabled" />
                        <InputRow label="Student Surname :" value={student.registrationBachelorThesis.surname} isDisabled="disabled"/>
                        <InputRow label="Student Forename :" value={student.registrationBachelorThesis.forename} isDisabled="disabled"/>
                        <InputRow label="Student Date Of Birth :" value={student.registrationBachelorThesis.dateOfBirth} isDisabled="disabled"/>
                        <InputRow label="Student Place Of Birth :" value={student.registrationBachelorThesis.placeOfBirth} isDisabled="disabled"/>
                        <InputRow label="Thesis Title :" value={student.registrationBachelorThesis.thesisTitle} isDisabled="disabled"/>
                        <InputRow label="Individual Or Group Study :" type="select" listContent={[{key: "0", label: "Individual"}, {key: "1", label: "Group"}]} defaultValue={student.registrationBachelorThesis.thesisType||student.registrationBachelorThesis.thesisType==='0' ? student.registrationBachelorThesis.thesisType : ""} isDisabled="disabled"/>
                        <InputRow label="Further Participants :" value={student.registrationBachelorThesis.furtherParticipants} isDisabled="disabled"/>
                        <InputRow label="Assessor :" value={student.registrationBachelorThesis.titleSup1} isDisabled="disabled"/>
                        <InputRow label="Date From Assessor :" value={student.registrationBachelorThesis.dateSup1} isDisabled="disabled"/>
                        <InputRow label="Co-Assessor :" value={student.registrationBachelorThesis.titleSup2} isDisabled="disabled"/>
                        <InputRow label="Date From Co-Assessor :" value={student.registrationBachelorThesis.dateSup2} isDisabled="disabled"/>
                        <InputRow label="Issued :" value={student.registrationBachelorThesis.issued} isDisabled="disabled"/>
                        <InputRow label="Deadline For Digital Copy :" value={student.registrationBachelorThesis.deadlineCopy} isDisabled="disabled"/>
                        <InputRow label="Extension Granted Until :" value={student.registrationBachelorThesis.grantedExtension} isDisabled="disabled"/>
                        <InputRow label="Chairman Of Examinations Board :" value={student.registrationBachelorThesis.chairmanOfExamination} isDisabled="disabled"/>
                        <InputRow label="Date Of Issue :" value={student.registrationBachelorThesis.dateOfIssue} isDisabled="disabled"/>
                        <div className="form-button-area">
                            <button className="form-add-button" onClick={()=>{signInRegFormAsSup2(student.id)}}>Sign In</button>
                        </div>
                    </div>)
                }else if(student.registrationBachelorThesis.step === 3){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>The form is done.</h5>
                    </div>)
                }
            }
        })
        return (
            <>
                <br/><hr/>
                <h3>Registration Of Bachelor Thesis</h3>
                {items}
            </>
        )
    }

    const signInRegFormAsSup1 = (studentId, isAccepted) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            studentId: studentId,
            confirmSignature: isAccepted
        }
        let url = "http://localhost:5000/lecturer1/signIn/registrationBachelorThesisAsSup1"
        Axios.post(url, body, config).then((response) => {
            setOpenForm(false);
            setLecturerThesis({...defaultForm})
            setReload(!reload);
        }).catch((e=>{
            console.log(e)
        }))
    }

    const signInRegFormAsSup2 = (studentId) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            studentId: studentId,
            confirmSignature: true
        }
        let url = props.lecturerType.includes("1") ? "http://localhost:5000/lecturer1/signIn/registrationBachelorThesisAsSup2" : "http://localhost:5000/lecturer2/signIn/registrationBachelorThesis"
        Axios.post(url, body, config).then((response) => {
            setOpenForm(false);
            setLecturerThesis({...defaultForm})
            setReload(!reload);
        }).catch((e=>{
            console.log(e)
        }))
    }

    const renderRegistrationOralDefense = () => {
        let items = [];
        lecturerThesis.studentList.map((student) => {
                if (student.registrationOralDefense.step === undefined){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>Not allowed to fill in the form yet</h5>
                    </div>)
                }else if (student.registrationOralDefense.step === 0){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>Waiting for the student to fill in the form</h5>
                    </div>)
                }else if(student.registrationOralDefense.step === 1){
                    items.push(<div key={student.id}>
                        <h3>Student {student.fullName+" - "+student.id}</h3>
                        <h5>The form is done.</h5>
                        {student.registrationOralDefense.proposedTime ? 
                            <>
                                <InputRow label="Weekday :" type="select" listContent={[{key: "0", label: "Monday"}, {key: "1", label: "Tuesday"}, {key: "2", label: "Wednesday"}, {key: "3", label: "Thursday"}, {key: "4", label: "Friday"}, {key: "5", label: "Saturday"}, {key: "6", label: "Sunday"}]} defaultValue={student.registrationOralDefense.weekday||student.registrationOralDefense.weekday==='0' ? student.registrationOralDefense.weekday : ""} isDisabled="disabled"/>
                                <InputRow label="Date :" value={student.registrationOralDefense.proposedDate} type="date" isDisabled="disabled"/>
                                <InputRow label="Time :" value={student.registrationOralDefense.proposedTime} isDisabled="disabled"/>
                                <InputRow label="Room :" value={student.registrationOralDefense.room} isDisabled="disabled"/>
                            </>
                            : null
                        }
                    </div>)
                }
        })
        return (
            <>
                <br/><hr/>
                <h3>Registration Of Oral Defense</h3>
                {items}
            </>
        )
        
    }

    const renderThesisList = () => {
        if(Object.keys(thesisList).length === 0){
            return
        }else if (props.lecturerType.includes("1")){
            return (
                <>
                    <thead>
                        <tr>
                            <th>Supervisor 1</th>
                            <th>Supervisor 2</th>
                            <th>Supervisor 2's Confirmation</th>
                            <th>Topic</th>
                            <th>Field</th>
                            <th>Slot</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {thesisList.list?.map((thesis) => {
                            return (
                                <tr key={thesis.thesis_id}>
                                    <td style={thesis.lecturer1_id_thesis===thesisList.lecturer_id ? {color:"red"} : {}}>{thesis.lecturer1_id_thesis}</td>
                                    <td style={thesis.lecturer2_id_thesis===thesisList.lecturer_id ? {color:"red"} : {}}>{thesis.lecturer2_id_thesis}</td>
                                    <td>{thesis.confirm_sup2 === 1 ? "confirmed" : "not confirmed"}</td>
                                    <td>{thesis.thesis_topic}</td>
                                    <td>{thesis.thesis_field}</td>
                                    <td>{thesis.slot+"/"+thesis.slot_maximum}</td>
                                    <td className="icon-column">
                                        <img className="icon delete_icon" src={delete_icon} alt="delete_icon" onClick={() => deleteRow(thesis.thesis_id)}/>
                                        <img className="icon" src={detail_icon} alt="detail_icon" onClick={() => detailRow(thesis.thesis_id)}/>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </>
            )
        } else{
            return (
                <>
                    <thead>
                        <tr>
                            <th>Supervisor 1</th>
                            <th>Topic</th>
                            <th>Field</th>
                            <th>Supervisor 2's Confirmation</th>
                            <th>Slot</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {thesisList.list?.map((thesis) => {
                            return (
                                <tr key={thesis.thesis_id}>
                                    <td>{thesis.lecturer1_id_thesis}</td>
                                    <td>{thesis.thesis_topic}</td>
                                    <td>{thesis.thesis_field}</td>
                                    <td>{thesis.confirm_sup2 === 1 ? "confirmed" : "not confirmed"}</td>
                                    <td>{thesis.slot+"/"+thesis.slot_maximum}</td>
                                    <td className="icon-column">
                                        <img className="icon delete_icon" src={delete_icon} alt="delete_icon" onClick={() => deleteRow(thesis.thesis_id)}/>
                                        <img className="icon" src={detail_icon} alt="detail_icon" onClick={() => detailRow(thesis.thesis_id)}/>
                                    </td>
                                </tr>
                            )
                        })}
                   </tbody>
                </>
            )
        }
    }

    const confirmSup2Request = (thesisId, isAccepted) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            thesisId: thesisId,
            confirmThesis: isAccepted
        }
        let url = props.lecturerType.includes("1") ? "http://localhost:5000/lecturer1/confirm/confirmThesis" : "http://localhost:5000/lecturer2/confirm/confirmThesis"
        Axios.post(url, body, config).then((response) => {
            setOpenForm(false);
            setLecturerThesis({...defaultForm})
            setReload(!reload);
        }).catch((e=>{
            console.log(e)
        }))
    }

    const confirmStudentRequest = (studentId, isAccepted) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            studentId: studentId,
            confirmStudent: isAccepted
        }
        let url = "http://localhost:5000/lecturer1/confirm/confirmStudent"
        Axios.post(url, body, config).then((response) => {
            setOpenForm(false);
            setLecturerThesis({...defaultForm})
            setReload(!reload);
        }).catch((e=>{
            console.log(e)
        }))
    }

    return (
        <div className="admin-lecturer-list">
            <div className="form">
                <div className="form-title" onClick={handleOpenForm}>Thesis Form</div>
                {openForm&&lecturerThesis.topic ? (
                    <div className="form-content">
                        <InputRow label="Topic :" value={lecturerThesis.topic} isDisabled="disabled"/>
                        <InputRow label="Field :" value={lecturerThesis.field} isDisabled="disabled"/>
                        <InputRow label="Slot :" value={lecturerThesis.numOfSlot + '/' + lecturerThesis.maxOfSlot} isDisabled="disabled"/>
                        <InputRow label="Step :" value={""+lecturerThesis.step} isDisabled="disabled"/>
                        <InputRow label="Supervisor 1 :" value={lecturerThesis.sup1.title + " - " + lecturerThesis.sup1.id + " - " + lecturerThesis.sup1.mail} isDisabled="disabled"/>
                        <InputRow label="Supervisor 2 :" value={lecturerThesis.sup2.id ? lecturerThesis.sup2.title + " - " + lecturerThesis.sup2.id + " - " + lecturerThesis.sup2.mail + (lecturerThesis.sup2.isConfirmed ? " - confirmed" : " - not confirmed") : ""} isDisabled="disabled"/>
                        {lecturerThesis.step >= 4 ?
                            <>
                                <InputRow label="Submission Deadline :" value={lecturerThesis.submissionDeadline} isDisabled="disabled"/>
                                <InputRow label="Number Of Hard Copies :" value={lecturerThesis.numberOfHardCopies} isDisabled="disabled"/>
                                <InputRow label="Print Requirements :" value={lecturerThesis.printRequirements} isDisabled="disabled"/>
                                <InputRow label="Template File :" value={""+lecturerThesis.templateFile} isDisabled="disabled"/>
                            </>
                            : null
                        }
                        <table className="table-content">
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>ID</th>
                                    <th>Intake</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {lecturerThesis.studentList.map((student) => {
                                    return (
                                        <tr key={student.id}>
                                            <td>{student.fullName}</td>
                                            <td>{student.id}</td>
                                            <td>{student.intake}</td>
                                            <td>{student.mail}</td>
                                            <td>{student.isConfirmed ? "confirmed" : 
                                                    (props.lecturerType.includes("1") ? 
                                                        <div className="icon-column">
                                                            <button className="form-add-button" onClick={()=>{confirmStudentRequest(student.id, true)}}>Accept</button>
                                                            <button className="form-cancel-button" onClick={()=>{confirmStudentRequest(student.id, false)}}>Reject</button>
                                                        </div> : "not confirmed"
                                                    )
                                            }</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {renderRegistrationBachelorThesis()}
                        {renderRegistrationOralDefense()}
                        {
                            lecturerThesis.myID === lecturerThesis.sup2.id && !lecturerThesis.sup2.isConfirmed ?
                            <>
                                <br/><hr/>
                                <div>You has been invited to this thesis as Supervisor 2. Please give your decision.</div>
                                <div className="form-button-area">
                                    <button className="form-add-button" onClick={()=>{confirmSup2Request(lecturerThesis.thesisID, true)}}>Accept</button>
                                    <button className="form-cancel-button" onClick={()=>{confirmSup2Request(lecturerThesis.thesisID, false)}}>Reject</button>
                                </div>
                            </> : null
                        }
                    </div>
                ) : null}
            </div>
            <div className="table">
                <div className="table-title">Thesis Table</div>
                <table className="table-content">
                        {renderThesisList()}
                </table>
                <PaginationBar totalPage={totalPage} activePage={activePage} changePage={changePage} changePageDirect={changePageDirect}/>
            </div>
        </div>
            
    );
};

export default ManagingTheses;