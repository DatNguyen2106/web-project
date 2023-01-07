import React, {useEffect, useState} from "react";
import Axios from "axios";
// import jsPDF from 'jspdf';
// import autoTable from "jspdf-autotable"
// import moment from 'moment';
const SignatureUploading = () => {
    // const [signature, setSignature] = useState("");
    // const encodeImageFileAsURL = (e) => {
    //     var file = e.target.files[0];
    //     var reader = new FileReader();
    //     reader.onloadend = function () {
    //         console.log('RESULT', reader.result)
    //         setSignature(reader.result)
    //     }
    //     reader.readAsDataURL(file);
    // }

    // const updateSignatureForAdmin = (e) => {
    //     if(signature === null || signature === undefined || signature === ''){
    //         console.log('ERROR when update because signature is null or undefined');
    //     }
    //     else {
    //         updateSignatureAdminAPI(signature);
    //     }
    // }

    // const updateSignatureAdminAPI = (signature) => {
    //     let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }}
    //     let body = {};
    //     body["signature"] = signature;
    //     console.log(body);
    //     Axios.post("http://localhost:5000/admin/update/signature", body, config).then((response) => {
    //         console.log(response);
    //       });
    // }

    // const getSignatureAdmin = async () => {
    //     let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }};
    //     var results;
    //     await Axios.get("http://localhost:5000/admin/get/signature", config).then((response) => {
    //         console.log(response);
    //         results = response.data[0].signature;
    //         console.log(results);
    //         setSignature(response.data[0].signature);
    //         return results;
    //       });
    // }

    // useEffect(() => {
    //     let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }};
    //     Axios
    //         .get("http://localhost:4000/roles", config)
    //         .then(res => {
    //             if(!res.data.role.includes("admin")){
    //                 window.location.replace("/denied");
    //             }
    //         })
    //         .catch(e => {
    //             console.log("catch");
    //         })
    //     getSignatureAdmin();    
    // }, []);
    // const downloadPDF = async () => {
    //     let config = {headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }};
    //     var registrationBachelorThesisResults = [];        
    //     await Axios.get("http://localhost:5000/admin/get/testForm", config).then(res => {
    //         if(res.data) {
    //             registrationBachelorThesisResults = res.data.registrationBachelorThesisResults[0];
    //         }
    //     })
    //     var pdf = new jsPDF('p','mm',[297, 210]);    
    //     registrationBachelorThesisFormFormat(registrationBachelorThesisResults);

    //     }


    // const registrationBachelorThesisFormFormat = async (data) => {
    //     var doc = new jsPDF('p', 'mm', [297, 210]);
    //     var pageHeight = doc.internal.pageSize.height;  
    //     console.log(pageHeight);
    //     // title Registration form title   
    //     // default x = 10;
    //     var xLeft = 10, xRight;
    //     var xRight = 210 - 2*xLeft;
    //     doc.setFont('times', 'bold');
    //     doc.setFontSize(18);
    //     doc.text('Registration for Bachelor Thesis', 100, 20, 'center');
    //     const formattedData = reformatRegistrationBachelorThesisFormData(data);
    //     console.log(formattedData);
    // // table at beginning of registration (Surname, Forename, Matriculation No., Date of Birth, Place of Birth)
    //     autoTable(doc, {
    //         columnStyles : {
    //         },
    //         startY : 30,
    //         endY : 50,
    //         body : [
    //             {
    //             'surname' : formattedData.surname,
    //             'forename' : formattedData.forename,
    //             'matriculation_number' : formattedData.matriculation_number,
    //             }
    //             ],
    //         columns : [
    //             {header : 'Surname', dataKey : 'surname'},
    //             {header : 'Forename', dataKey : 'forename'},
    //             {header : 'Matriculation No', dataKey : 'matriculation_number'},

    //         ],
    //     })
    //     autoTable(doc, {
    //         columnStyles : {
    //         },
    //         startY : 50,
    //         endY : 70,
    //         body : [
    //             {
    //             'date_of_birth' : formattedData.date_of_birth,
    //             'place_of_birth' : formattedData.place_of_birth,
    //             }
    //             ],
    //         columns : [
    //             {header : 'Date Of Birth', dataKey : 'date_of_birth'},
    //             {header : 'Place Of Birth', dataKey : 'place_of_birth'},
    //         ],
    //     })
    //     var recordY = 70;
    //     // text record 
    //     doc.setFontSize(9);
    //     doc.text('Record(s) of completed examinations totaling 168 CP plus a valid proof of matriculation are required!', xLeft, recordY + 5)
    //     doc.setFont('times','normal');
    //     var paragraph1 = doc.splitTextToSize("The following declaration must be signed in accordance with § 9, section 1 of the General Provisions for Examination Regulations  for Bachelor and Master degrees at the Frankfurt University of Applied Sciences of 10th November, 2004, last amended on 12th November, 2014:", xRight);
    //     doc.text(paragraph1, xLeft, recordY + 15);
    //     var paragraph2 = doc.splitTextToSize("I hereby declare that I have not previously failed at the final attempt any preliminary, intermediate or final examination, either as a student or as an external candidate, in any other identically named or related degree program at another Institute of Higher Education within the jurisdiction of the Framework Law for Higher Education and that I am not currently involved in any pending examination process.", xRight);
    //     doc.text(paragraph2, xLeft, recordY + 25);

    //     doc.text("Signature : ", 160, recordY  + 40);
    //     //get element
    //     doc.addImage(signature, 'JPEG', 180, recordY + 35, 10 , 10);

    //     console.log("signature" + signature);
    //     //title of bachelor thesis
    //     var titleBachelorThesisY = recordY + 60;
    //     doc.text('Title of Bachelor Thesis: ', 10, titleBachelorThesisY - 2);
    //     doc.line(xLeft + 60, titleBachelorThesisY, xRight, titleBachelorThesisY);
    //     var title_bachelor_thesis = doc.splitTextToSize(formattedData.title_bachelor_thesis, xRight - (xLeft + 60));
    //     doc.text(title_bachelor_thesis, xLeft + 60, titleBachelorThesisY - 2)
    //     doc.line(xLeft + 60, titleBachelorThesisY + 10, xRight, titleBachelorThesisY + 10);
    //     doc.line(xLeft + 60, titleBachelorThesisY + 20, xRight, titleBachelorThesisY + 20);

    //     //
    //     doc.save('test.pdf');
    // }
    // const reformatRegistrationBachelorThesisFormData = (data) => {
    //     data.matriculation_number = data.matriculation_number.toString();
    //     data.date_of_birth = moment(data.date_of_birth).format("DD/MM/YYYY").toString();
    //     console.log(data.date_of_birth);
    //     return data;
    // }

    return (
        <>

            <div>Hello World</div>
            {/* <button  onClick= {downloadPDF}>Download</button> */}
            {/* <input type="file" multiple={true} onChange={handleImage}/> */}
            {/* <h1>Load from local file</h1>
            <input type="file" onChange={encodeImageFileAsURL} />
            <button onClick={updateSignatureForAdmin}>Update signature</button>
            <div>

            </div> */}
        </>
    );
};


export default SignatureUploading;