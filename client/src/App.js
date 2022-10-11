import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
const App = () => {
  const [lecturer_id, setLecturerId] = useState("");
  const [lecturer_user_name, setLecturerUserName] = useState("");
  const [lecturer_fullName, setLecturerFullName] = useState("");
  const [lecturer_email, setLecturerEmail] = useState("");
  const [lecturer_supervisor, setLecturerSupervisor] = useState("");


  const [lecturerList, setLecturerList] = useState([]);
  const [newLecturerUserName, setNewLecturerUserName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getLecturers").then((response) => {
      setLecturerList(response.data);
      console.log(response.data);
    });
  }, []);
  const submitBtn = () => {
    Axios.post("http://localhost:3001/api/insert/lecturer", {
      lecturer_id: lecturer_id.toString(),
      lecturer_user_name: lecturer_user_name.toString(),
      lecturer_fullName: lecturer_fullName.toString(),
      lecturer_email: lecturer_email.toString(),
      lecturer_supervisor: lecturer_supervisor.toString(),
    });
    setLecturerList([...lecturerList, {lecturer_id: lecturer_id, lecturer_user_name: lecturer_user_name, fullname: lecturer_fullName, email: lecturer_email, supervisor: lecturer_supervisor},])
  };

  const deleteBtn = (lecturer_id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to save changes?") === true) {
        console.log(lecturer_id);
        Axios.delete(`http://localhost:3001/api/delete/lecturer/${lecturer_id}`).then(res => {
          this.setState(prevState => ({
            news: prevState.news.filter(el => el.id !== lecturer_id )
          }));
        })
        .catch(error => console.log(error));
    } else {
        return;
    }
  } 

  
  const updateBtn = (lecturer_id) => {
    console.log(lecturer_id + '+' + newLecturerUserName);
    Axios.put('http://localhost:3001/api/update/lecturer', {
        lecturer_id : lecturer_id.toString(),
        lecturer_user_name : newLecturerUserName.toString(),
    })
    setNewLecturerUserName("");
  } 

  return (
    <div className="App">
      <h1>CRUD operations</h1>
      <div className="form">
        <label>Lecturer ID</label>
        <input
          type="text"
          name="lecturer_id"
          onChange={(e) => {
            console.log(e.target.value);
            setLecturerId(e.target.value);
          }}
        ></input>
        <label>Lecturer User Name</label>
        <input
          type="text"
          name="lecturer_user_name"
          onChange={(e) => {
            console.log(e.target.value);
            setLecturerUserName(e.target.value);
          }}
        ></input>
        <label>Lecturer Full Name</label>
        <input
          type="text"
          name="lecturer_fullName"
          onChange={(e) => {
            console.log(e.target.value);
            setLecturerFullName(e.target.value);
          }}
        ></input>
        <label>Lecturer Email</label>
        <input
          type="text"
          name="lecturer_email"
          onChange={(e) => {
            console.log(e.target.value);
            setLecturerEmail(e.target.value);
          }}
        ></input>
        <label>Supervisor 1</label>
        <input
          type="text"
          name="lecturer_supervisor"
          onChange={(e) => {
            console.log(e.target.value);
            setLecturerSupervisor(e.target.value);
          }}
        ></input>
        <button onClick={submitBtn}>Submit</button>
        {lecturerList.map((val) => {
          console.log(val);
          return (       
            <div className="lecturers" key={val.lecturer_id}>
                <h3>Lecturer_id : {val.lecturer_id}</h3>
                <ul>
                    <li>Lecturer User Name : {val.lecturer_user_name}</li>
                    <li>Lecturer Full Name : {val.fullname}</li>
                    <li>Lecturer Email : {val.email}</li>
                    <li>Lecturer Supervisor : {val.supervisor}</li>
                </ul>
                <button onClick={() => {deleteBtn(val.lecturer_id)}}>Delete</button>
                <input type="text" id ="updateInput" onChange={(e) => {
                    console.log(e.target.value);
                    setNewLecturerUserName(e.target.value)}}/>
                <button onClick={() => {updateBtn(val.lecturer_id)}}>Update</button>
            </div>
);
        })}
      </div>
    </div>
  );
};

<script type="javascript">
    
</script>;
export default App;
