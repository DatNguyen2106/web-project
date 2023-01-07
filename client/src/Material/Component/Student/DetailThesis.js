import React, { useEffect, useState }  from "react";
import Axios from "axios";
import "../../Style/Admin/LecturerTable.css";
import InputRow from "../InputRow.js";
const DetailThesis = () => {  
    const defaultForm = {
        myInfo: {
            id: "", 
            fullName: "", 
            intake: "", 
            mail: "", 
            isConfirmed: false,
        },
        topic: "", 
        field: "", 
        numOfSlot: "", 
        maxOfSlot: "", 
        step: "", 
        sup1: {
            id: "",
            title: "",
            mail: "",
        },
        sup2: {
            id: "",
            title: "",
            mail: "",
            isConfirmed: false,
        },
        studentList: [], //id, fullName, intake, mail, isConfirmed
        registrationBachelorThesis: {
            step: "",
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
        registrationOralDefense: {
            step: "",
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
    }
    const [reload, setReload] = useState(false);
    const [studentThesis, setStudentThesis] = useState({...defaultForm});
    const [studentThesisError, setStudentThesisError] = useState({...defaultForm});
    
    useEffect(() => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        Axios.get("http://localhost:5000/student/get/thesis", config).then((response) => {
            console.log(response.data)
            let me = {}
            let curList = []
            if(response.data.list.length > 0){
                for (const i of response.data.list[0].student_list){
                    curList.push({
                        id: i.student_id,
                        fullName: i.fullName,
                        intake: i.intake,
                        mail: i.email,
                        isConfirmed: i.confirmSup1===1 ? true : false,
                    })
                    if (i.student_id === response.data.student_id){
                        me = {
                            id: i.student_id, 
                            fullName: i.fullName, 
                            intake: i.intake, 
                            mail: i.email, 
                            isConfirmed: i.confirmSup1===1 ? true : false,
                        }
                    }
                }
            }
            setStudentThesis({
                myInfo: me,
                topic: response.data.list[0]?.thesis_topic, 
                field: response.data.list[0]?.thesis_field, 
                numOfSlot: response.data.list[0]?.slot, 
                maxOfSlot: response.data.list[0]?.slot_maximum,
                step: response.data.list[0]?.step, 
                submissionDeadline: response.data.list[0].submission_deadline ? new Date(response.data.list[0].submission_deadline).toLocaleDateString("fr-CA") : "",
                templateFile: response.data.list[0].template_files,
                numberOfHardCopies: response.data.list[0].number_hard_copies,
                printRequirements: response.data.list[0].print_requirements,
                sup1: {
                    id: response.data.list[0]?.lecturer1_id,
                    title: response.data.list[0]?.title,
                    mail: response.data.list[0]?.lecturer1_email,
                },
                sup2: {
                    id: response.data.list[0]?.lecturer2_id,
                    title: response.data.list[0]?.lecturer2_title,
                    mail: response.data.list[0]?.lecturer2_email,
                    isConfirmed: response.data.list[0]?.confirm_sup2===1 ? true : false,
                },
                studentList: curList, //id, fullName, intake, mail, isConfirmed
                registrationBachelorThesis: {
                    step: response.data.registrationBachelorThesisResults[0]?.step,
                    matriculationNumber: response.data.registrationBachelorThesisResults[0]?.matriculation_number,
                    surname: response.data.registrationBachelorThesisResults[0]?.surname,
                    forename: response.data.registrationBachelorThesisResults[0]?.forename,
                    dateOfBirth: response.data.registrationBachelorThesisResults[0]?.date_of_birth ? new Date(response.data.registrationBachelorThesisResults[0]?.date_of_birth).toLocaleDateString("fr-CA") : "",
                    placeOfBirth: response.data.registrationBachelorThesisResults[0]?.place_of_birth,
                    thesisTitle: response.data.registrationBachelorThesisResults[0]?.title_bachelor_thesis,
                    thesisType: response.data.registrationBachelorThesisResults[0]?.thesis_type,
                    furtherParticipants: response.data.registrationBachelorThesisResults[0]?.further_participants,
                    titleSup1: response.data.registrationBachelorThesisResults[0]?.supervisor1_title,
                    dateSup1: response.data.registrationBachelorThesisResults[0]?.supervisor1_date ? new Date(response.data.registrationBachelorThesisResults[0]?.supervisor1_date).toLocaleDateString("fr-CA") : "",
                    titleSup2: response.data.registrationBachelorThesisResults[0]?.supervisor2_title,
                    dateSup2: response.data.registrationBachelorThesisResults[0]?.supervisor2_date ? new Date(response.data.registrationBachelorThesisResults[0]?.supervisor2_date).toLocaleDateString("fr-CA") : "",
                    issued: response.data.registrationBachelorThesisResults[0]?.issued ? new Date(response.data.registrationBachelorThesisResults[0]?.issued).toLocaleDateString("fr-CA") : "",
                    deadlineCopy: response.data.registrationBachelorThesisResults[0]?.deadline_copy,
                    grantedExtension: response.data.registrationBachelorThesisResults[0]?.extension_granted ? new Date(response.data.registrationBachelorThesisResults[0]?.extension_granted).toLocaleDateString("fr-CA") : "",
                    chairmanOfExamination: response.data.registrationBachelorThesisResults[0]?.chairman_of_examination,
                    dateOfIssue: response.data.registrationBachelorThesisResults[0]?.date_of_issue ? new Date(response.data.registrationBachelorThesisResults[0]?.date_of_issue).toLocaleDateString("fr-CA") : "",
                },
                registrationOralDefense: {
                    step: response.data.registrationOralDefenseResults[0]?.step,
                    matriculationNumber: response.data.registrationOralDefenseResults[0]?.matriculation_number,
                    surname: response.data.registrationOralDefenseResults[0]?.surname,
                    forename: response.data.registrationOralDefenseResults[0]?.forename,
                    titleSup1: response.data.registrationOralDefenseResults[0]?.supervisor1_title,
                    titleSup2: response.data.registrationOralDefenseResults[0]?.supervisor2_title,
                    areSpectatorsAllowed: response.data.registrationOralDefenseResults[0]?.spectators_present,
                    weekday: response.data.registrationOralDefenseResults[0]?.weekdate,
                    proposedDate: response.data.registrationOralDefenseResults[0]?.proposed_date ? new Date(response.data.registrationOralDefenseResults[0]?.proposed_date).toLocaleDateString("fr-CA") : "",
                    proposedTime: response.data.registrationOralDefenseResults[0]?.proposed_time,
                    room: response.data.registrationOralDefenseResults[0]?.room,
                    haveThoseAgreed: response.data.registrationOralDefenseResults[0]?.concerned_agreed,
                    receivedDate: response.data.registrationOralDefenseResults[0]?.date_receive ? new Date(response.data.registrationOralDefenseResults[0]?.date_receive).toLocaleDateString("fr-CA") : "",
                    admissionDate: response.data.registrationOralDefenseResults[0]?.date_submission ? new Date(response.data.registrationOralDefenseResults[0]?.date_submission).toLocaleDateString("fr-CA") : "",
                },
            })
        }).catch(e => {
            console.log(e);
        });
    }, [reload]);

    const changeForm = (field1, field2, value) => {
        setStudentThesis({
            ...studentThesis,
            [field1]:{
                ...studentThesis[field1],
                [field2]: value
            }
        });
    };

    const submitForm = (extraURL) => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {}
        if(extraURL === "registrationBachelorThesis"){
            body = {
                studentId : studentThesis.myInfo.id,
                matriculationNumber : studentThesis.registrationBachelorThesis.matriculationNumber,
                surName: studentThesis.registrationBachelorThesis.surname,
                foreName: studentThesis.registrationBachelorThesis.forename,
                dateOfBirth: studentThesis.registrationBachelorThesis.dateOfBirth,
                placeOfBirth: studentThesis.registrationBachelorThesis.placeOfBirth,
                titleBachelorThesis: studentThesis.registrationBachelorThesis.thesisTitle,
                thesisType: studentThesis.registrationBachelorThesis.thesisType,
                furtherParticipants: studentThesis.registrationBachelorThesis.furtherParticipants,
                supervisor1_title: studentThesis.registrationBachelorThesis.titleSup1,
                supervisor1_date: studentThesis.registrationBachelorThesis.dateSup1,
                supervisor2_title: studentThesis.registrationBachelorThesis.titleSup2,
                supervisor2_date: studentThesis.registrationBachelorThesis.dateSup2,
                issued: studentThesis.registrationBachelorThesis.issued,
                deadlineCopy: studentThesis.registrationBachelorThesis.deadlineCopy,
                extensionGranted: studentThesis.registrationBachelorThesis.grantedExtension,
                chairmanOfExamination: studentThesis.registrationBachelorThesis.chairmanOfExamination,
                dateOfIssue: studentThesis.registrationBachelorThesis.dateOfIssue,
            }
        }else if(extraURL === "registrationOralDefense"){
            body = {
                studentId : studentThesis.myInfo.id,
                matriculationNumber : studentThesis.registrationOralDefense.matriculationNumber,
                surName: studentThesis.registrationOralDefense.surname,
                foreName: studentThesis.registrationOralDefense.forename,
                supervisor1_title: studentThesis.registrationOralDefense.titleSup1,
                supervisor2_title: studentThesis.registrationOralDefense.titleSup2,
                spectatorsPresent: studentThesis.registrationOralDefense.areSpectatorsAllowed,
                weekDate: studentThesis.registrationOralDefense.weekday,
                proposedDate: studentThesis.registrationOralDefense.proposedDate,
                proposedTime: studentThesis.registrationOralDefense.proposedTime,
                room: studentThesis.registrationOralDefense.room,
                concernedAgreed: studentThesis.registrationOralDefense.haveThoseAgreed,
                dateReceive: studentThesis.registrationOralDefense.receivedDate,
                dateSubmission: studentThesis.registrationOralDefense.admissionDate,
            }
        }
        console.log(body)
        Axios.put(`http://localhost:5000/student/update/${extraURL}`, body, config).then((response)=>{
            setReload(!reload)
        }).catch(e => {
            console.log(e);
        });
        
    };

    const renderRegistrationBachelorThesis = () => {
        console.log(studentThesis)
        if (studentThesis.registrationBachelorThesis.step === 0){
            return (
                <>
                    <br/><hr/>
                    <h3>Registration Of Bachelor Thesis</h3>
                    <h5>Please fill in the form and send to Supervisor 1.</h5>
                    <InputRow label="Student ID :" value={studentThesis.myInfo.id} isDisabled="disabled"/>
                    <InputRow label="Student Matriculation Number :" value={studentThesis.registrationBachelorThesis.matriculationNumber} field1="registrationBachelorThesis" field2="matriculationNumber" error={studentThesisError.registrationBachelorThesis.matriculationNumber} changeContent={changeForm}/>
                    <InputRow label="Student Surname :" value={studentThesis.registrationBachelorThesis.surname} field1="registrationBachelorThesis" field2="surname" error={studentThesisError.registrationBachelorThesis.surname} changeContent={changeForm}/>
                    <InputRow label="Student Forename :" value={studentThesis.registrationBachelorThesis.forename} field1="registrationBachelorThesis" field2="forename" error={studentThesisError.registrationBachelorThesis.forename} changeContent={changeForm}/>
                    <InputRow label="Student Date Of Birth :" value={studentThesis.registrationBachelorThesis.dateOfBirth} type="date" field1="registrationBachelorThesis" field2="dateOfBirth" error={studentThesisError.registrationBachelorThesis.dateOfBirth} changeContent={changeForm}/>
                    <InputRow label="Student Place Of Birth :" value={studentThesis.registrationBachelorThesis.placeOfBirth} field1="registrationBachelorThesis" field2="placeOfBirth" error={studentThesisError.registrationBachelorThesis.placeOfBirth} changeContent={changeForm}/>
                    <InputRow label="Thesis Title :" value={studentThesis.registrationBachelorThesis.thesisTitle} field1="registrationBachelorThesis" field2="thesisTitle" error={studentThesisError.registrationBachelorThesis.thesisTitle} changeContent={changeForm}/>
                    <InputRow label="Individual Or Group Study :" type="select" listContent={[{key: "0", label: "Individual"}, {key: "1", label: "Group"}]} defaultValue={studentThesis.registrationBachelorThesis.thesisType||studentThesis.registrationBachelorThesis.thesisType==='0' ? studentThesis.registrationBachelorThesis.thesisType : ""} field1="registrationBachelorThesis" field2="thesisType" error={studentThesisError.registrationBachelorThesis.thesisType} changeContent={changeForm}/>
                    <InputRow label="Further Participants :" value={studentThesis.registrationBachelorThesis.furtherParticipants} field1="registrationBachelorThesis" field2="furtherParticipants" error={studentThesisError.registrationBachelorThesis.furtherParticipants} changeContent={changeForm}/>
                    <InputRow label="Assessor :" value={studentThesis.registrationBachelorThesis.titleSup1} field1="registrationBachelorThesis" field2="titleSup1" error={studentThesisError.registrationBachelorThesis.titleSup1} changeContent={changeForm}/>
                    <InputRow label="Date From Assessor :" value={studentThesis.registrationBachelorThesis.dateSup1} type="date"  field1="registrationBachelorThesis" field2="dateSup1" error={studentThesisError.registrationBachelorThesis.dateSup1} changeContent={changeForm}/>
                    <InputRow label="Co-Assessor :" value={studentThesis.registrationBachelorThesis.titleSup2} field1="registrationBachelorThesis" field2="titleSup2" error={studentThesisError.registrationBachelorThesis.titleSup2} changeContent={changeForm}/>
                    <InputRow label="Date From Co-Assessor :" value={studentThesis.registrationBachelorThesis.dateSup2} type="date"  field1="registrationBachelorThesis" field2="dateSup2" error={studentThesisError.registrationBachelorThesis.dateSup2} changeContent={changeForm}/>
                    <InputRow label="Issued :" value={studentThesis.registrationBachelorThesis.issued} type="date" field1="registrationBachelorThesis" field2="issued" error={studentThesisError.registrationBachelorThesis.issued} changeContent={changeForm}/>
                    <InputRow label="Deadline For Digital Copy :" value={studentThesis.registrationBachelorThesis.deadlineCopy} field1="registrationBachelorThesis" field2="deadlineCopy" error={studentThesisError.registrationBachelorThesis.deadlineCopy} changeContent={changeForm}/>
                    <InputRow label="Extension Granted Until :" value={studentThesis.registrationBachelorThesis.grantedExtension} type="date" field1="registrationBachelorThesis" field2="grantedExtension" error={studentThesisError.registrationBachelorThesis.grantedExtension} changeContent={changeForm}/>
                    <InputRow label="Chairman Of Examinations Board :" value={studentThesis.registrationBachelorThesis.chairmanOfExamination} field1="registrationBachelorThesis" field2="chairmanOfExamination" error={studentThesisError.registrationBachelorThesis.chairmanOfExamination} changeContent={changeForm}/>
                    <InputRow label="Date Of Issue :" value={studentThesis.registrationBachelorThesis.dateOfIssue} type="date" field1="registrationBachelorThesis" field2="dateOfIssue" error={studentThesisError.registrationBachelorThesis.dateOfIssue} changeContent={changeForm}/>
                    <div className="form-button-area">
                        <button className="form-add-button" onClick={()=>submitForm("registrationBachelorThesis")}>Update</button>
                    </div>
                </>
            )
        }else if(studentThesis.registrationBachelorThesis.step === 1){
            return (
                <>
                    <br/><hr/>
                    <h3>Registration Of Bachelor Thesis</h3>
                    <h5>Sent to Supervisor 1. Waiting for confirmation.</h5>
                </>
            )
        }else if(studentThesis.registrationBachelorThesis.step === 2){
            return (
                <>
                    <br/><hr/>
                    <h3>Registration Of Bachelor Thesis</h3>
                    <h5>Sent to Supervisor 2. Waiting for confirmation.</h5>
                </>
            )
        }else if(studentThesis.registrationBachelorThesis.step === 3){
            return (
                <>
                    <br/><hr/>
                    <h3>Registration Of Bachelor Thesis</h3>
                    <h5>The form is done.</h5>
                </>
            )
        }
        
    }

    const renderRegistrationOralDefense = () => {
        if (studentThesis.registrationOralDefense.step === 0){
            return (
                <>
                    <br/><hr/>
                    <h3>Registration Of Oral Defense</h3>
                    <h5>Please fill in the form and send to Supervisor 1</h5>
                    <InputRow label="Student ID :" value={studentThesis.myInfo.id} isDisabled="disabled"/>
                    <InputRow label="Student Matriculation Number :" value={studentThesis.registrationOralDefense.matriculationNumber} field1="registrationOralDefense" field2="matriculationNumber" error={studentThesisError.registrationOralDefense.matriculationNumber} changeContent={changeForm} />
                    <InputRow label="Student Surname :" value={studentThesis.registrationOralDefense.surname} field1="registrationOralDefense" field2="surname" error={studentThesisError.registrationOralDefense.surname} changeContent={changeForm}/>
                    <InputRow label="Student Forename :" value={studentThesis.registrationOralDefense.forename} field1="registrationOralDefense" field2="forename" error={studentThesisError.registrationOralDefense.forename} changeContent={changeForm}/>
                    <InputRow label="First Examiner :" value={studentThesis.registrationOralDefense.titleSup1} field1="registrationOralDefense" field2="titleSup1" error={studentThesisError.registrationOralDefense.titleSup1} changeContent={changeForm}/>
                    <InputRow label="Second Examiner :" value={studentThesis.registrationOralDefense.titleSup2} field1="registrationOralDefense" field2="titleSup2" error={studentThesisError.registrationOralDefense.titleSup2} changeContent={changeForm}/>
                    <InputRow label="Are spectators allowed to be present :" type="select" listContent={[{key: "0", label: "No"}, {key: "1", label: "Yes"}]} defaultValue={studentThesis.registrationOralDefense.areSpectatorsAllowed||studentThesis.registrationOralDefense.areSpectatorsAllowed==='0' ? studentThesis.registrationOralDefense.areSpectatorsAllowed : ""} field1="registrationOralDefense" field2="areSpectatorsAllowed" error={studentThesisError.registrationOralDefense.areSpectatorsAllowed} changeContent={changeForm}/>
                    <InputRow label="Weekday :" type="select" listContent={[{key: "0", label: "Monday"}, {key: "1", label: "Tuesday"}, {key: "2", label: "Wednesday"}, {key: "3", label: "Thursday"}, {key: "4", label: "Friday"}, {key: "5", label: "Saturday"}, {key: "6", label: "Sunday"}]} defaultValue={studentThesis.registrationOralDefense.weekday||studentThesis.registrationOralDefense.weekday==='0' ? studentThesis.registrationOralDefense.weekday : ""} field1="registrationOralDefense" field2="weekday" error={studentThesisError.registrationOralDefense.weekday} changeContent={changeForm}/>
                    <InputRow label="Date :" value={studentThesis.registrationOralDefense.proposedDate} type="date" field1="registrationOralDefense" field2="proposedDate" error={studentThesisError.registrationOralDefense.proposedDate} changeContent={changeForm}/>
                    <InputRow label="Time :" value={studentThesis.registrationOralDefense.proposedTime} field1="registrationOralDefense" field2="proposedTime" error={studentThesisError.registrationOralDefense.proposedTime} changeContent={changeForm}/>
                    <InputRow label="Room :" value={studentThesis.registrationOralDefense.room} field1="registrationOralDefense" field2="room" error={studentThesisError.registrationOralDefense.room} changeContent={changeForm}/>
                    <InputRow label="Have those concerned agreed :" type="select" listContent={[{key: "0", label: "No"}, {key: "1", label: "Yes"}]} defaultValue={studentThesis.registrationOralDefense.haveThoseAgreed||studentThesis.registrationOralDefense.haveThoseAgreed==='0' ? studentThesis.registrationOralDefense.haveThoseAgreed : ""} field1="registrationOralDefense" field2="haveThoseAgreed" error={studentThesisError.registrationOralDefense.haveThoseAgreed} changeContent={changeForm}/>
                    <InputRow label="Date received :" value={studentThesis.registrationOralDefense.receivedDate} type="date" field1="registrationOralDefense" field2="receivedDate" error={studentThesisError.registrationOralDefense.receivedDate} changeContent={changeForm}/>
                    <InputRow label="Date of admission :" value={studentThesis.registrationOralDefense.admissionDate} type="date" field1="registrationOralDefense" field2="admissionDate" error={studentThesisError.registrationOralDefense.admissionDate} changeContent={changeForm}/>
                    <div className="form-button-area">
                        <button className="form-add-button" onClick={()=>submitForm("registrationOralDefense")}>Update</button>
                    </div>
                </>
            )
        }else if(studentThesis.registrationOralDefense.step === 1){
            return (
                <>
                    <br/><hr/>
                    <h3>Registration Of Bachelor Thesis</h3>
                    <h5>The form is done.</h5>
                </>
            )
        }
        
    }
    
    const renderThesisInfo = () => {
        if (!studentThesis.sup1.id){
            return(
                <div>No Thesis Found.</div>
            )
        }else if (!studentThesis.myInfo.isConfirmed) {
            return (
                <div>Applying to thesis {studentThesis.topic} from {studentThesis.sup1.title}. Waiting for confirmation.</div>
            )
        }else {
            return(
                <div >
                    <div className="form-title">Lecturer Form</div>
                    <div className="form-content">
                        <InputRow label="Topic :" value={studentThesis.topic} isDisabled="disabled"/>
                        <InputRow label="Field :" value={studentThesis.field} isDisabled="disabled"/>
                        <InputRow label="Slot :" value={studentThesis.numOfSlot + '/' + studentThesis.maxOfSlot} isDisabled="disabled"/>
                        <InputRow label="Step :" value={""+studentThesis.step} isDisabled="disabled"/>
                        <InputRow label="Supervisor 1 :" value={studentThesis.sup1.title + " - " + studentThesis.sup1.id + " - " + studentThesis.sup1.mail} isDisabled="disabled"/>
                        <InputRow label="Supervisor 2 :" value={studentThesis.sup2.id ? studentThesis.sup2.title + " - " + studentThesis.sup2.id + " - " + studentThesis.sup2.mail + (studentThesis.sup2.isConfirmed ? " - confirmed" : " - not confirmed") : ""} isDisabled="disabled"/>
                        {console.log(studentThesis)}
                        {studentThesis.step >= 4 ?
                            <>
                                <InputRow label="Submission Deadline :" value={studentThesis.submissionDeadline} isDisabled="disabled"/>
                                <InputRow label="Number Of Hard Copies :" value={studentThesis.numberOfHardCopies} isDisabled="disabled"/>
                                <InputRow label="Print Requirements :" value={studentThesis.printRequirements} isDisabled="disabled"/>
                                <InputRow label="Template File :" value={""+studentThesis.templateFile} isDisabled="disabled"/>
                            </>
                            : null
                        }
                        {studentThesis.registrationOralDefense.proposedTime ? 
                            <>
                                <InputRow label="Weekday :" type="select" listContent={[{key: "0", label: "Monday"}, {key: "1", label: "Tuesday"}, {key: "2", label: "Wednesday"}, {key: "3", label: "Thursday"}, {key: "4", label: "Friday"}, {key: "5", label: "Saturday"}, {key: "6", label: "Sunday"}]} defaultValue={studentThesis.registrationOralDefense.weekday||studentThesis.registrationOralDefense.weekday==='0' ? studentThesis.registrationOralDefense.weekday : ""} isDisabled="disabled"/>
                                <InputRow label="Date :" value={studentThesis.registrationOralDefense.proposedDate} type="date" isDisabled="disabled"/>
                                <InputRow label="Time :" value={studentThesis.registrationOralDefense.proposedTime} isDisabled="disabled"/>
                                <InputRow label="Room :" value={studentThesis.registrationOralDefense.room} isDisabled="disabled"/>
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
                                {studentThesis.studentList.map((student) => {
                                    return (
                                        <tr key={student.id}>
                                            <td>{student.fullName}</td>
                                            <td>{student.id}</td>
                                            <td>{student.intake}</td>
                                            <td>{student.mail}</td>
                                            <td>{student.isConfirmed ? "confirmed" : "not confirmed"}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {renderRegistrationBachelorThesis()}
                        {renderRegistrationOralDefense()}
                    </div>
                </div>
            )
        }
    }

    

    return (
        <>
            {renderThesisInfo()}
        </>
    );
};

export default DetailThesis;