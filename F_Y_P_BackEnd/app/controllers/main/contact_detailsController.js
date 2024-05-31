const { pool } = require("../../config/db.config");
exports.addPersonalInfo = async (req, res) => {

    try {
        // DESTRUCTURE FROM REQUEST BODY
        const { email, address, phone, name, user_id, license } = req.body;
        // CHECKING IF DATA IS NOT AVAILABLE RETURNING THE RESPONSE WITH STATUS FALSE
        if (!email || !phone || !name || !user_id) {
            return res.status(401).json({
                status: false,
                message: "Personal Info can not be added. Both all email, phone, name, user_id are required"
            });
        }

        // SETTING UP QUERY TO ADD THE LANGUAGE
        const query = 'INSERT INTO personal_info (email, address, phone, name, user_id, license ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        // ADDING THE DATA USING QUERY ABOVE
        const savedPersonalInfo = await pool.query(query, [
            email ? email : '',
            address ? address : '',
            phone ? phone : '',
            name ? name : '',
            user_id ? user_id : '',
            license ? license :''
        ]);

        // CHECKING IF THE DATA WAS ADDED SUCESSFULLY
        if (!savedPersonalInfo.rows[0]) {
            return res.status(401).json({
                status: false,
                message: "Personal Info can not be added due to unknown reason while saving in db"
            });
        }
        // SEDNING RESPONSE IF THE DATA WAS ADDED SUCESSFULLY
        res.status(200).json({
            status: true,
            message: "personal info added sucessfully",
            results: savedPersonalInfo.rows[0]
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.editPersonalInfo = async (req, res) => {
    try {
        // DESTRUCTURING DATA FROM BODY
        const { personal_info_id, email, address, phone, name, license } = req.body;

        // CHECKING IF THE DATA IS AVAILABLE
        if (!personal_info_id) {
            return res.status(401).json({
                status: false,
                message: "can not make changes, personal_info_id is required"
            });
        }

        // SETTING UP QUERY TO UPDATE DATA IN DB IF FLUENCY IS NOT GIVEN
        let query = 'UPDATE personal_info SET ';
        let index = 2
        let values = [personal_info_id]
        let combinedquery;
        // CHECKING IF FLUENCY IS NOT AVAILABLE THEN UPDATING ONLY LANGUAGE
        if (email) {
            // SETTING UP TITLE IN QUERY
            query += `email = $${index} , `;
            values.push(email)
            index++
        }
        if (license) {
            // SETTING UP TITLE IN QUERY
            query += `license = $${index} , `;
            values.push(license)
            index++
        }
        if (address) {
            // SETTING UP TITLE IN QUERY
            query += `address = $${index} , `;
            values.push(address)
            index++

        }
        if (phone) {
            // SETTING UP TITLE IN QUERY
            query += `phone = $${index} , `;
            values.push(phone)
            index++
        }
        if (name) {
            // SETTING UP TITLE IN QUERY
            query += `name = $${index} , `;
            values.push(name)
            index++
        }
        // FINALIZING QUERY
        query += 'WHERE personal_info_id = $1 RETURNING *'
        query = query.replace(/,\s+WHERE/g, " WHERE");
        // UPDATING DATA IN DB USING QUERY ABOVE
        const educationUpdated = await pool.query(query, values);

        // CHECKING IF THE DATA WAS NOT UPDATED SUCESSFULLY THEN SENDING RESPONSE WITH STATUS FALSE
        if (!educationUpdated.rows[0]) {
            return res.status(401).json({
                status: false,
                message: "Personal info could not be updated because Personal info with this id does not exsists"
            });
        }

        res.status(200).json({
            status: true,
            message: "Personal info updated sucessfully",
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
exports.deletePersonalInfo = async (req, res) => {
    const { personal_info_id } = req.query;
    try {
        if (!personal_info_id) {
            res.status(500).json({
                status: false,
                message: "Personal Info id is required"
            });
        }
        const query = `SELECT * FROM personal_info WHERE personal_info_id = $1`;
        const results = await pool.query(query, [personal_info_id]);
        if (results.rowCount < 1) {
            return res.json({
                status: false,
                message: "Data does not exsists"
            });
        }
        res.json({
            status: true,
            message: "Data fetched",
            result: results.rows
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getAllPersonalInfo = async (req, res) => {
    const db = await pool.connect();
    try {
        const query = `SELECT * FROM personal_info`
        const results = await pool.query(query)
        if (results.rowCount < 1) {
            return res.json({
                status: false,
                message: "Data does not exsists"
            });
        }
        res.json({
            status: true,
            message: "Data fetched",
            result: results.rows
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getUserPersonalInfo = async (req, res) => {
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
        const query = 'SELECT * FROM personal_info WHERE user_id = $1';

        // FETCHING DATA FROM DB USING QUERY ABOVE
        const personalInfo = await db.query(query, [user_id]);

        // CHECKING IF THE DATA WAS NOT FETCHED SENDING RESPONSE WITH STATUS FALSE
        if (!personalInfo.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched"
            });
        }

        // CHECKING IF THE DATA WAS FETCHED SUCESSFULLY SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "Found sucessfully",
            results: personalInfo.rows
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getPersonalInfoById = async (req, res) => {
    const db = await pool.connect();
    try {
        // DESTRUCTURE DATA FROM REQUEST QUERY
        const { personal_info_id } = req.query;

        // CHECKING IF THE DATA IS AVAILABLE
        if (!personal_info_id) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched, because personal_info_id is required"
            });
        }

        // SETTING UP QUERY TO FETCH USER OBJECTIVE FROM DB
        const query = 'SELECT * FROM personal_info WHERE personal_info_id = $1';

        // FETCHING DATA FROM DB USING QUERY ABOVE
        const personalInfo = await db.query(query, [personal_info_id]);

        // CHECKING IF THE DATA WAS NOT FETCHED SENDING RESPONSE WITH STATUS FALSE
        if (!personalInfo.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched"
            });
        }

        // CHECKING IF THE DATA WAS FETCHED SUCESSFULLY SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "Found sucessfully",
            results: personalInfo.rows
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}