import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'mydb'
})

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended :true }));

app.get('/api/getLecturers', (req, res) => {
    const sqlSelect = "SELECT * FROM lecturers;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})
app.get('/api/getThesises', (req, res) => {
    const sqlSelect = "SELECT * FROM thesises";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})
app.post('/api/insert/lecturer', (req, res) => {
    const lecturer_id = req.body.lecturer_id;
    const lecturer_user_name = req.body.lecturer_user_name;
    const lecturer_fullName = req.body.lecturer_fullName;
    const lecturer_email = req.body.lecturer_email;
    const lecturer_supervisor = req.body.lecturer_supervisor;
    console.log(lecturer_email, lecturer_id);
    const sqlInsert = "INSERT INTO lecturers (lecturer_id, lecturer_user_name, fullname, email, supervisor) VALUES (?,?,?,?,?)"; //
    db.query(sqlInsert, [lecturer_id, lecturer_user_name, lecturer_fullName, lecturer_email, lecturer_supervisor], (err, result) => {
        if (err) throw err;
        console.log(result);
    })
})
app.delete('/api/delete/lecturer/:lecturer_id', (req,res) => {
    const lecturer_id = req.params.lecturer_id;
    const sqlDelete = "DELETE FROM lecturers where lecturer_id = ?;"; 
    db.query(sqlDelete, [lecturer_id], (err, results) => {
        if (err) throw err;
        res.json({news: results});
    })
})
app.put('/api/update/lecturer', (req,res) => {
    const lecturer_id = req.body.lecturer_id;
    const lecturer_user_name = req.body.lecturer_user_name;
    console.log(lecturer_id, lecturer_user_name)
    const sqlUpdate = "Update lecturers SET lecturer_user_name = ? where lecturer_id = ?;"; 
    db.query(sqlUpdate, [lecturer_user_name, lecturer_id], (err, result) => {
        if (err) throw err;
        console.log(result);
    })
})
app.listen(3001, () => {
    console.log('listening on http://localhost:3001')
})