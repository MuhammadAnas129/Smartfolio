const { pool } = require("../../config/db.config");
exports.addEducation = async (req, res) => {
    // const db = await pool.connect();
    try {
        // DESTRUCTURE FROM REQUEST BODY
        const { title, institute, started_from, ended_at, description, user_id } = req.body;
        // CHECKING IF DATA IS NOT AVAILABLE RETURNING THE RESPONSE WITH STATUS FALSE
        if (!title || !institute || !started_from || !ended_at || !description || !user_id) {
            return res.status(401).json({
                status: false,
                message: "Education can not be added. Both all title, institute, started_from, ended_at, description, user_id are required"
            });
        }

        // SETTING UP QUERY TO ADD THE LANGUAGE
        const query = 'INSERT INTO educations (title, institute, started_from, ended_at, description, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

        // ADDING THE DATA USING QUERY ABOVE
        const savedEducation = await pool.query(query, [
            title ? title : '',
            institute ? institute : '',
            started_from ? started_from : '',
            ended_at ? ended_at : '',
            description ? description : '',
            user_id ? user_id : ''
        ]);

        // CHECKING IF THE DATA WAS ADDED SUCESSFULLY
        if (!savedEducation.rows[0]) {
            return res.status(401).json({
                status: false,
                message: "Education can not be added due to unknown reason while saving in db"
            });
        }

        // SEDNING RESPONSE IF THE DATA WAS ADDED SUCESSFULLY
        res.status(200).json({
            status: true,
            message: "Education added sucessfully",
            results: savedEducation.rows[0]
        });




    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: err
        });
    }
}
exports.updateEducation = async (req, res) => {
    // const db = await pool.connect();
    try {
        // DESTRUCTURING DATA FROM BODY
        const { title, institute, started_from, ended_at, description, education_id } = req.body;

        // CHECKING IF THE DATA IS AVAILABLE
        if (!education_id) {
            return res.status(401).json({
                status: false,
                message: "can not make changes, education_id is required"
            });
        }

        // SETTING UP QUERY TO UPDATE DATA IN DB IF FLUENCY IS NOT GIVEN
        let query = 'UPDATE educations SET ';
        let index = 2
        let values = [education_id]
        let combinedquery;
        // CHECKING IF FLUENCY IS NOT AVAILABLE THEN UPDATING ONLY LANGUAGE
        if (title) {
            // SETTING UP TITLE IN QUERY
            query += `title = $${index} , `;
            values.push(title)
            index++
        }

        if (institute) {
            // SETTING UP TITLE IN QUERY
            query += `institute = $${index} , `;
            values.push(institute)
            index++

        }
        if (started_from) {
            // SETTING UP TITLE IN QUERY
            query += `started_from = $${index} , `;
            values.push(started_from)
            index++
        }
        if (ended_at) {
            // SETTING UP TITLE IN QUERY
            query += `ended_at = $${index} , `;
            values.push(ended_at)
            index++
        }
        if (description) {
            // SETTING UP TITLE IN QUERY
            query += `description = $${index} , `;
            values.push(description)
            index++
        }
        // FINALIZING QUERY
        query += 'WHERE education_id = $1 RETURNING *'
        query = query.replace(/,\s+WHERE/g, " WHERE");
        // UPDATING DATA IN DB USING QUERY ABOVE
        const educationUpdated = await pool.query(query, values);

        // CHECKING IF THE DATA WAS NOT UPDATED SUCESSFULLY THEN SENDING RESPONSE WITH STATUS FALSE
        if (!educationUpdated.rows[0]) {
            return res.status(401).json({
                status: false,
                message: "Education could not be updated because Education with this id does not exsists"
            });
        }

        res.status(200).json({
            status: true,
            message: "Experience updated sucessfully",
            results: educationUpdated.rows[0]
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: err
        });
    }
}
exports.deleteEducation = async (req, res) => {
    const db = await pool.connect();
    try {
        // DESTRUCTURE FROM REQUEST BODY
        const { education_id } = req.query;

        // CHECKING IF THE DATA IS AVAILABLE
        if (!education_id) {
            return res.status(401).json({
                status: false,
                message: "can not delete, education_id is required"
            });
        }

        // SETTING UP QUERY TO DELETE DATA IN DB
        const query = 'DELETE FROM educations WHERE education_id = $1';

        // DELETING DATA IN DB USING QUERY ABOVE
        const educationDeleted = await db.query(query, [
            education_id
        ]);

        // CHECKING IF THE DATA WAS NOT DELETED SUCESSFULLY THEN SENDING RESPONSE WITH STATUS FALSE
        if (educationDeleted.rowCount < 1) {
            return res.status(401).json({
                status: false,
                message: "Education could not be deleted because language with this id does not exsists"
            });
        }
        // IF THE DATA WAS DELETED THEN SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "Education deleted sucessfully",
            results: educationDeleted.rows[0]
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getAllEducation = async (req, res) => {
    const db = await pool.connect();
    try {

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getUserEducation = async (req, res) => {
    const db = await pool.connect();
    try {
        // DESTRUCTURE DATA FROM REQUEST QUERY
        const { user_id } = req.query;

        // CHECKING IF THE DATA IS AVAILABLE
        if (!user_id) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched, because user_id is required"
            });
        }

        // SETTING UP QUERY TO FETCH USER OBJECTIVE FROM DB
        const query = 'SELECT * FROM educations WHERE user_id = $1';

        // FETCHING DATA FROM DB USING QUERY ABOVE
        const educations = await db.query(query, [user_id]);

        // CHECKING IF THE DATA WAS NOT FETCHED SENDING RESPONSE WITH STATUS FALSE
        if (!educations.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched"
            });
        }

        // CHECKING IF THE DATA WAS FETCHED SUCESSFULLY SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "educations Found sucessfully",
            results: educations.rows
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.addUserEducation = async (req, res) => {
    // const db = await pool.connect();
    try {
        // DESTRUCTURING DATA FROM BODY
        const { education_id, user_id } = req.body;

        // CHECKING IF THE DATA IS AVAILABLE
        if (!education_id || !user_id) {
            return res.status(401).json({
                status: false,
                message: "can not make changes, education_id and user_id is required"
            });
        }

        const query = 'UPDATE users SET education = array_append(education, $1) WHERE user_id = $2 RETURNING *'
        const educationUpdated = await pool.query(query, [education_id, user_id]);

        // CHECKING IF THE DATA WAS NOT UPDATED SUCESSFULLY THEN SENDING RESPONSE WITH STATUS FALSE
        if (!educationUpdated.rows[0]) {
            return res.status(401).json({
                status: false,
                message: "Education was not added in users because user does not exsist"
            });
        }

        res.status(200).json({
            status: true,
            message: "Education Added sucessfully",
            results: educationUpdated.rows[0]
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}
exports.getEducationById = async (req,res)=>{
    const { education_id } = req.query;
    try {
        // DESTRUCTURE DATA FROM REQUEST QUERY
        

        // CHECKING IF THE DATA IS AVAILABLE
        if (!education_id) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched, because education_id is required"
            });
        }

        // SETTING UP QUERY TO FETCH USER OBJECTIVE FROM DB
        const query = 'SELECT * FROM educations WHERE education_id = $1';

        // FETCHING DATA FROM DB USING QUERY ABOVE
        const educations = await pool.query(query, [education_id]);

        // CHECKING IF THE DATA WAS NOT FETCHED SENDING RESPONSE WITH STATUS FALSE
        if (!educations.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched. Education does not exsists"
            });
        }

        // CHECKING IF THE DATA WAS FETCHED SUCESSFULLY SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "educations Found sucessfully",
            results: educations.rows
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}