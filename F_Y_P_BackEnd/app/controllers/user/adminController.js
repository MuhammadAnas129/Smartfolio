const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {pool} = require("../../config/db.config");




exports.registerAdmin =async (req,res,next)=>{
    const client = await pool.connect();

    try{
        const { error } = registerSchema.validate(req.body);
    
    if(error){
        return (
            res.status(400).json({
                message: "Error occurred",
                error: error.details[0].message,
                status:false
            })
        )
    }
    const email = req.body.email;
    const password = req.body.password;

    const found_email_query = 'SELECT * FROM admins WHERE email = $1'
    const emailExists = await pool.query(found_email_query , [email])

    if (emailExists.rowCount>0) {
        return (
            res.status(400).json({
                message: "admin with this email already exists",
                status: false
            })
        )
    }



    const query = 'INSERT INTO admins (email , password) VALUES ($1 , $2) RETURNING*'
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    const result = await pool.query(query , [email , hashPassword]);

    if(result.rows[0]){
        res.json({
            message: "admin Has been registered successfully",
            status : true,
            result:result.rows[0]
        })
    }
    else{
        res.json({
            message: "Could not Register user",
            status :false,
        })
    }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            status : false,
            error: err.message
        })
    }
    finally {
        client.release();
      }
    
    
}


exports.login = async (req,res)=>{
    try{
        const email = req.body.email;
        let password = req.body.password;

        if(!email || !password){
            return (
                res.status(400).json({
                    message: "email and password must be provided",
                    status:false
                })
            )
        }
        const query = 'SELECT * FROM admins WHERE email = $1';
        const foundResult = await pool.query(query  , [email]);



        if (foundResult.rowCount == 0) {
            return (
                res.status(400).json({
                    message: "Wrong email or password",
                    status: false
                })
            )
        }
        const vaildPass = await bcrypt.compare(password, foundResult.rows[0].password);
        if (!vaildPass) {
            return (
                res.status(401).json({
                    message: "Wrong email or password",
                    status: false
                })
            )
        }

        const token = jwt.sign({ id: foundResult.rows[0].admin_id }, process.env.TOKEN, { expiresIn: '30d' });
        res.json({
            message: "Logged in Successfully",
            status: true,
            result: foundResult.rows[0],
            jwt_token: token
        });

        
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            status : false,
            error: err.message
        })
    }
}

exports.viewAdminProfile = async(req,res)=>{
    try{
        const admin_id = req.query.admin_id;

        if(!admin_id){
            return(
                res.json({
                    message: "admin_id is missing",
                    status: false
                })
            )
        }

        const query = "SELECT * FROM admins WHERE id = $1";

        const result = await pool.query(query , [admin_id]);

        if(result.rows[0]){
            res.json({
                message: "Admin Profile Fetched successfully",
                status : true,
                result : result.rows[0]
            })
        }
        else{
            res.json({
                message: "Could not fetch admin profile",
                status : false
            })
        }
    }
    catch(err){
        res.json({
            message: "Error Occurred",
            status : false,
            error: err.message
        })
    }
}

exports.updateProfile = async (req, res) => {
    const client = await pool.connect();
    try {
        const admin_id = req.body.admin_id;
        const user_name = req.body.user_name;
        const img = req.body.img;
        const email = req.body.email;


        let query = 'UPDATE admins SET ';
        let index = 2;
        let values =[admin_id];

        if(user_name){
            query+= `user_name = $${index} , `;
            values.push(user_name)
            index ++
        }
        if(img){
            query+= `img = $${index} , `;
            values.push(img)
            index ++
        }
        if(email){
            query+= `email = $${index} , `;
            values.push(email)
            index ++
        }

        
        query += 'WHERE admin_id = $1 RETURNING*'
        query = query.replace(/,\s+WHERE/g, " WHERE");


        const result = await pool.query(query , values)


        if(result.rows[0]){
            res.json({
                message : "Record Updated",
                status : true,
                result:result.rows[0]
            })
        }
        else{
            res.json({
                message: "Record could not be updated",
                status :false,
            })
        }

    }
    catch (err) {
        res.json({
            message: "Error Occurred",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
      }
}

exports.getAllAdmins = async(req,res)=>{
    const client = await pool.connect();
    try{
        const query = 'SELECT * FROM admins'
        const result = await pool.query(query);

        
        if(result.rows){
            res.json({
                message : "All admins",
                status : true,
                result:result.rows
            })
        }
        else{
            res.json({
                message: "could not fetch",
                status :false,
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error Occurred",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
      }
}

exports.passwordUpdate = async(req,res)=>{
    const client = await pool.connect();
    try{
        const email = req.body.email;
        const newPassword = req.body.newPassword ;
        if(!email || !newPassword){
            return(
                res.json({
                    message: "email and new password must be provided",
                    status : false
                })
            )
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword ,salt);

        let query = 'UPDATE admins SET ';
        let index = 2
        let values = [email];

        if(hashPassword){
            query+= `password= $${index}`;
            values.push(hashPassword);
            index++
        }

        query += 'WHERE email = $1 RETURNING*'
        query = query.replace(/,\s+WHERE/g, " WHERE");
        const result = await pool.query(query , values)

        if(result.rows[0]){
            res.json({
                message : "Record Updated",
                status : true,
                result:result.rows[0]
            })
        }
        else{
            res.json({
                message: "Record could not be updated",
                status :false,
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error Occurred",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
      }
}
const registerSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });