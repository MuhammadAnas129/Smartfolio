const {pool} = require("../../config/db.config");


exports.addreference = async (req, res) => {
    const client = await pool.connect();
    try {
        const user_id = req.body.user_id;
        const name = req.body.name;
        const email_id = req.body.email_id;
        const contact_no = req.body.contact_no;

        if ( !user_id) {
            return (
                res.json({
                    message: "Please provide user_id for creating reference",
                    status: false
                })
            )
        }

        const query = 'INSERT INTO references_table (name , email_id , contact_no , user_id) VALUES ($1 , $2 , $3 , $4) RETURNING*'
        const result = await pool.query(query , 
            [
                name ? name : null ,
                email_id ?email_id : null,
                contact_no ? contact_no : null,
                user_id ? user_id : null,
            ]);

            
        if (result.rows[0]) {
            res.status(201).json({
                message: "reference saved in database",
                status: true,
                result: result.rows[0]
            })
        }
        else {
            res.status(400).json({
                message: "Could not save",
                status: false
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error",
            status: false,
            error: err.messagefalse
        })
    }
    finally {
        client.release();
      }

}

exports.updatereference = async (req, res) => {
    const client = await pool.connect();
    try {
        const reference_id = req.body.reference_id;
        const name = req.body.name;
        const email_id = req.body.email_id;
        const contact_no = req.body.contact_no;


        if (!reference_id) {
            return (
                res.json({
                    message: "Please provide refrence_id ",
                    status: false
                })
            )
        }

       
        let query = 'UPDATE references_table SET ';
        let index = 2;
        let values =[reference_id];



        if(name){
            query+= `name = $${index} , `;
            values.push(name)
            index ++
        }

        if(email_id){
            query+= `email_id = $${index} , `;
            values.push(email_id)
            index ++
        }
        

        if(contact_no){
            query+= `contact_no = $${index} , `;
            values.push(contact_no)
            index ++
        }
        
        

        query += 'WHERE refrence_id = $1 RETURNING*'
        query = query.replace(/,\s+WHERE/g, " WHERE");

       const result = await pool.query(query , values);

        if (result.rows[0]) {
            res.json({
                message: "Updated",
                status: true,
                result: result.rows[0]
            })
        }
        else {
            res.json({
                message: "Could not update . Record With this Id may not found or req.body may be empty",
                status: false,
            })
        }

    }
    catch (err) {
        res.json({
            message: "Error",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
      }
}

exports.deletereference = async (req, res) => {
    const client = await pool.connect();
    try {
        const reference_id = req.query.reference_id;
        if (!reference_id) {
            return (
                res.json({
                    message: "Please Provide reference_id",
                    status: false
                })
            )
        }
        const query = 'DELETE FROM references_table WHERE refrence_id = $1 RETURNING *';
        const result = await pool.query(query , [reference_id]);

        if(result.rowCount>0){
            res.status(200).json({
                message: "Deletion successfull",
                status: true,
                deletedRecord: result.rows[0]
            })
        }
        else{
            res.status(404).json({
                message: "Could not delete . Record With this Id may not found or req.body may be empty",
                status: false,
            })
        }

    }
    catch (err) {
        res.json({
            message: "Error",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
      }
}

exports.getAllreferences = async (req, res) => {
    const client = await pool.connect();
    try {

        let limit = req.query.limit;
        let page = req.query.page

        
        if (!page || !limit) {
            const query = 'SELECT * FROM references_table'
            result = await pool.query(query);
           
        }

        if(page && limit){
            limit = parseInt(limit);
            let offset= (parseInt(page)-1)* limit

        const query = 'SELECT * FROM references_table LIMIT $1 OFFSET $2'
        result = await pool.query(query , [limit , offset]);

      
        }

        if (result.rows) {
            res.json({
                message: "Fetched",
                status: true,
                result: result.rows
            })
        }
        else {
            res.json({
                message: "could not fetch",
                status: false
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
      }

}

exports.getreferenceById = async (req, res) => {
    const client = await pool.connect();
    try {
        const reference_id = req.query.reference_id;

        if (!reference_id) {
            return (
                res.status(400).json({
                    message: "Please Provide refrence_id",
                    status: false
                })
            )
        }
        const query = 'SELECT * FROM references_table WHERE refrence_id = $1'
        const result = await pool.query(query , [reference_id]);

        if (result.rowCount>0) {
            res.json({
                message: "Fetched",
                status: true,
                result: result.rows[0]
            })
        }
        else {
            res.json({
                message: "could not fetch",
                status: false
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
      }

}

exports.getreferencesByuser_id = async(req,res)=>{
    const client = await pool.connect();
    try {
        const user_id = req.query.user_id;
        if (!user_id) {
            return (
                res.status(400).json({
                    message: "Please Provide user_id",
                    status: false
                })
            )
        }
        const query = 'SELECT * FROM references_table WHERE user_id = $1'
        const result = await pool.query(query , [user_id]);

        if (result.rowCount>0) {
            res.json({
                message: "Fetched",
                status: true,
                result: result.rows
            })
        }
        else {
            res.json({
                message: "could not fetch",
                status: false
            })
        }
    }
    catch (err) {
        res.json({
            message: "Error",
            status: false,
            error: err.message
        })
    }
    finally {
        client.release();
      }

}