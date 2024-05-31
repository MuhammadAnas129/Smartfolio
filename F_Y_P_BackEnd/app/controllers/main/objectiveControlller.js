const { pool } = require("../../config/db.config");
exports.addObjective = async (req, res) => {
    // CONNECTING TO DB

    try {

        // DESTRUCTURE FROM REQUEST BODY
        const { objective, user_id } = req.body;
        // CHECKING IF DATA IS NOT AVAILABLE RETURNING THE RESPONSE WITH STATUS FALSE
        if (!objective || !user_id) {
            return res.status(401).json({
                status: false,
                message: "Object can not be added. Both objective and user_id are required"
            });
        }

        // SETTING QUERY TO FIND IF THE OBJECTIVE ALREADY EXSISTS OF THE SAME USER
        const findObjextQuery = 'SELECT * FROM objectives WHERE user_id = $1';
        // SEARCHING FOR THE OBJECTIVE IN DB USING QUERY ABOVE
        const findObjective = await pool.query(findObjextQuery, [user_id]);
        // CHECKING IF THE OBJECTIVE EXSISTS THEN PERFORM UPDATE
        if (findObjective.rows[0]) {
            // SETTING UP QUERY TO UPDATE THE OBJECTIVE
            const query = 'UPDATE objectives SET objective = $1 WHERE user_id = $2 RETURNING *';
            // UPDATING THE DATA USING QUERY ABOVE
            const savedObjective = await pool.query(query, [objective, user_id]);

            // CHECK IF THE DATA IS NOT SAVED RETURNING RESPONSE WITH STATUS FALSE
            if (!savedObjective.rows[0]) {
                return res.status(401).json({
                    status: false,
                    message: "Objective did not updated sucessfully",
                })
            }

            // SENDING RESPONSE WITH STATUS TRUE IF THE DATA WAS UPDATED SUCESSFULLY
            return res.status(200).json({
                status: true,
                message: "Objective updated sucessfully",
                results: savedObjective.rows[0]
            })
        }
        // SETTING UP QUERY TO ADD THE OBJECTIVE
        const query = 'INSERT INTO objectives (objective, user_id) VALUES ($1, $2) RETURNING *';

        // ADDING THE DATA USING QUERY ABOVE
        const savedObjective = await pool.query(query, [objective, user_id]);

        // CHECKING IF THE DATA WAS ADDED SUCESSFULLY
        if (!savedObjective.rows[0]) {
            return res.status(401).json({
                status: false,
                message: "Object can not be added due to unknown reason while saving in db"
            });
        }

        // SEDNING RESPONSE IF THE DATA WAS ADDED SUCESSFULLY
        res.status(200).json({
            status: true,
            message: "Objective added sucessfully",
            results: savedObjective.rows[0]
        })


    } catch (err) {

        // EXCEPTION HANDLING
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error:err.message
        });
    }
}
exports.updateObjective = async (req, res) => {
    // CONNECTING TO DB

    try {

        // DESTRUCTURING DATA FROM BODY
        const { objective_id, objective } = req.body;

        // CHECKING IF THE DATA IS AVAILABLE
        if (!objective_id || !objective) {
            return res.status(401).json({
                status: false,
                message: "can not make changes, objective_id and objective is required"
            });
        }

        // SETTING UP QUERY TO UPDATE DATA IN DB
        const query = 'UPDATE objectives SET objective = $1 WHERE objective_id = $2 RETURNING *';

        // UPDATING DATA IN DB USING QUERY ABOVE
        const objectiveUpdated = await pool.query(query, [
            objective,
            objective_id
        ]);
        // CHECKING IF THE DATA WAS NOT UPDATED SUCESSFULLY THEN SENDING RESPONSE WITH STATUS FALSE
        if (!objectiveUpdated.rows[0]) {
            return res.status(401).json({
                status: false,
                message: "objective could not be updated because object with this id does not exsists"
            });
        }

        res.status(200).json({
            status: true,
            message: "objective updated sucessfully",
            results: objectiveUpdated.rows[0]
        })



    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.deleteObjective = async (req, res) => {
    // CONNECTING TO DB
    const db = await pool.connect();
    try {

        // DESTRUCTURE FROM REQUEST BODY
        const { objective_id } = req.body;

        // CHECKING IF THE DATA IS AVAILABLE
        if (!objective_id) {
            return res.status(401).json({
                status: false,
                message: "can not delete, objective_id is required"
            });
        }

        // SETTING UP QUERY TO DELETE DATA IN DB
        const query = 'DELETE FROM objectives WHERE objective_id = $1';

        // DELETING DATA IN DB USING QUERY ABOVE
        const objectiveUpdated = await db.query(query, [
            objective_id
        ]);

        // CHECKING IF THE DATA WAS NOT DELETED SUCESSFULLY THEN SENDING RESPONSE WITH STATUS FALSE
        if (objectiveUpdated.rowCount < 1) {
            return res.status(401).json({
                status: false,
                message: "objective could not be deleted because objective with this id does not exsists"
            });
        }
        // IF THE DATA WAS DELETED THEN SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "objective deleted sucessfully",
            results: objectiveUpdated.rows[0]
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getAllObjective = async (req, res) => {
    // CONNECTING TO DB
    const db = await pool.connect();
    try {

        // SETTING UP QUERY TO FETCH ALL DATA FROM DB
        const query = 'SELECT * FROM objectives';

        // FETCHING ALL DATA FROM DB USING QUERY ABOVE
        const allObjectives = await db.query(query);

        // CHECKING IF THE DATA WAS NOT FOUND SENDING RESPONSE WITH STATUS FALSE
        if (!allObjectives.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched"
            });
        }

        // IF THE DB WAS FETCHED SUCESSFULLY THEN SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "objectives found sucessfully",
            results: allObjectives.rows
        })
    } catch (err) {

        // EXCEPTION HANDLING
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getUserObjective = async (req, res) => {

    // CONNECTING TO DB
    const db = await pool.connect();
    try {

        // DESTRUCTURE DATA FROM REQUEST QUERY
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched, because user_id is required"
            });
        }

        // SETTING UP QUERY TO FETCH USER OBJECTIVE FROM DB
        const query = 'SELECT * FROM objectives WHERE user_id = $1';

        // FETCHING DATA FROM DB USING QUERY ABOVE
        const allObjectives = await db.query(query, [user_id]);

        // CHECKING IF THE DATA WAS NOT FETCHED SENDING RESPONSE WITH STATUS FALSE
        if (!allObjectives.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched"
            });
        }

        // CHECKING IF THE DATA WAS FETCHED SUCESSFULLY SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "objective Found sucessfully",
            results: allObjectives.rows
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getObjectiveById = async (req, res) => {

    // CONNECTING TO DB
    const db = await pool.connect();
    try {
        // DESTRUCTURE DATA FROM REQUEST QUERY
        const { objective_id } = req.query;

        // CHECKING IF DATA IS RECIEVED
        if (!objective_id) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched, because objective_id is required"
            });
        }
        // SETTING UP QUERY TO FETCH USER OBJECTIVE FROM DB
        const query = 'SELECT * FROM objectives WHERE objective_id = $1';

        // FETCHING DATA FROM DB USING QUERY ABOVE
        const allObjectives = await db.query(query, [objective_id]);

        // CHECKING IF THE DATA WAS NOT FETCHED SENDING RESPONSE WITH STATUS FALSE
        if (!allObjectives.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched"
            });
        }

        // CHECKING IF THE DATA WAS FETCHED SUCESSFULLY SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "objective Found sucessfully",
            results: allObjectives.rows
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}