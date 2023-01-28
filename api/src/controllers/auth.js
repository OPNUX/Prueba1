import { db } from "../database/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req,res)=>{

    //DATA
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const namee = req.body.name;

    //CHECK USER IF EXIST;
    db.query(`SELECT * FROM users WHERE username = '${username}'`, (err,data)=>{
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(409).json("User already exists!")
           //CREATE A NEW USER
        //Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt);

        db.query(`INSERT INTO users (username,email,password,name) VALUE ('${username}', '${email}', '${hashedPassword}', '${namee}')`, (err,data)=> {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
};



export const login = (req,res)=>{

     //DATA
     const username = req.body.username;
     const email = req.body.email;
     const password = req.body.password;
     const namee = req.body.name;


    db.query(`SELECT * FROM users WHERE username = '${username}'`, (err,data)=>{
        if (err) return res.status(500).json(err)
        if (!data.length) return res.status(409).json("User not found!");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password); 
        if (!checkPassword) return res.status(400).json("wrong password or username");
        
        const token = jwt.sign({ id : data[0].id }, "secretkey");

        res.cookie("accessToken", token, {
            httpOnly : true,
        }).status(200).json();
    });
};

export const logout = (req,res)=>{
    res.clearCookie("accessToken", {
        secure : true,
        sameSite: "none"
    }).status(200).json("user has been logged out");
};