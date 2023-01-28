import mysql from "mysql";

const db = mysql.createConnection({
    host : "localhost",
    database : "social",
    user : "root",
    password : "441229043",
    port : "3306"
});

const dbConnect = db.connect((err)=>{
    if (err) console.log(err);
    else {console.log("CONNECT")};
}
); 

export { db, dbConnect };