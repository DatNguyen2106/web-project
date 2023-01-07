import React, { useEffect, useState }  from "react";
import Axios from "axios";
import "../../Style/Admin/LecturerTable.css";
import PaginationBar from "../PaginationBar";
import InputRow from "../InputRow.js";
const ThesisTable = (props) => {
    const defaultForm = {
        id: "",
        topic: "",
        field: "",
        slotMax: "",
    }
    const [reload, setReload] = useState(false);
    const [thesisFormContent, setThesisFormContent] = useState({...defaultForm});
    const [thesisFormError, setThesisFormError] = useState({...defaultForm});
    //const [thesisListSearch, setThesisListSearch] = useState({});
    const [thesisList, setThesisList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [openForm, setOpenForm] = React.useState(true);

    useEffect(() => {
        let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
        let body = {
            page: activePage.toString()
        }
        let url = "http://localhost:5000/lecturer1/get/theses"
        Axios.post(url, body, config).then((response) => {
            setThesisList(response.data);
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

    // const changeSearch = (field, value) => {
    //     setThesisListSearch({
    //         ...thesisListSearch,
    //         [field]: value
    //     });
    // };

    // const search = () => {
    //     setReload(!reload);
    // };

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
        if(!thesisFormContent.slotMax){
            formError.slotMax = "Slot Maximum cannot be empty"
        }else if(!/^-?\d+$/.test(thesisFormContent.slotMax)){
            formError.slotMax = "Slot Maximum must be a number"
        }
        setThesisFormError(formError);
    }

    useEffect(() => {
        validateForm();
    }, [thesisFormContent]);

    const submitForm = () => {
        if (thesisFormError.id === "" && thesisFormError.topic === "" && thesisFormError.field === "" && thesisFormError.slotMax === ""){
            let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
            let body = {
                thesisId: parseInt(thesisFormContent.id),
                thesisTopic: thesisFormContent.topic,
                thesisField: thesisFormContent.field,
                slotMaximum: parseInt(thesisFormContent.slotMax),
            }
            Axios.post("http://localhost:5000/lecturer1/add/thesis", body, config).then((response)=>{
                setThesisFormContent({...defaultForm})
                setThesisFormError({...defaultForm})
                setReload(!reload)
            }).catch(e => {
                console.log(e)
                // window.location.replace("/denied?message=" + "Error Occured");
            });
        }
    };

    const cancelForm = () => {
        setThesisFormContent({...defaultForm})
        setThesisFormError({...defaultForm})
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

    const renderThesisList = () => {
        if(Object.keys(thesisList).length === 0){
            return
        }else{
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
                                </tr>
                            )
                        })}
                    </tbody>
                </>
            )
        }
    }

    return (
        <div className="admin-lecturer-list">
            <div className="form">
                <div className="form-title" onClick={handleOpenForm}>Thesis Form</div>
                {openForm ? (
                    <div className="form-content">
                        <InputRow label="Thesis ID :" value={thesisFormContent.id} field="id" error={thesisFormError.id} changeContent={changeForm}/>
                        <InputRow label="Thesis Topic :" value={thesisFormContent.topic} field="topic" error={thesisFormError.topic} changeContent={changeForm}/>
                        <InputRow label="Thesis Field :" value={thesisFormContent.field} field="field" error={thesisFormError.field} changeContent={changeForm}/>
                        <InputRow label="Thesis Slot Max :" value={thesisFormContent.slotMax} field="slotMax" error={thesisFormError.slotMax} changeContent={changeForm}/>
                        <div className="form-button-area">
                            <button className="form-add-button" onClick={submitForm}>Add</button>
                            <button className="form-cancel-button" onClick={cancelForm}>Cancel</button>
                        </div>
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

export default ThesisTable;