const { pool } = require("../../config/db.config");
exports.addLanguage = async (req, res) => {
    // CONNECTING TO DB
    // const db = await pool.connect();
    try {
        // DESTRUCTURE FROM REQUEST BODY
        const { language, fluency, user_id } = req.body;
        // CHECKING IF DATA IS NOT AVAILABLE RETURNING THE RESPONSE WITH STATUS FALSE
        if (!language || !user_id) {
            return res.status(401).json({
                status: false,
                message: "Language can not be added. Both language and user_id are required"
            });
        }
        // SETTING UP QUERY TO ADD THE LANGUAGE
        const query = 'INSERT INTO languages (language, fluency, user_id) VALUES ($1, $2, $3) RETURNING *';
        // ADDING THE DATA USING QUERY ABOVE
        const savedLanguage = await pool.query(query, [
            language,
            fluency ? fluency : '',
            user_id]);
        // CHECKING IF THE DATA WAS ADDED SUCESSFULLY
        if (!savedLanguage.rows[0]) {
            return res.status(401).json({
                status: false,
                message: "Language can not be added due to unknown reason while saving in db"
            });
        }

        // SEDNING RESPONSE IF THE DATA WAS ADDED SUCESSFULLY
        res.status(200).json({
            status: true,
            message: "Language added sucessfully",
            results: savedLanguage.rows[0]
        });




    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.updateLanguage = async (req, res) => {
    try {
        // DESTRUCTURING DATA FROM BODY
        const { language_id, language, fluency } = req.body;

        // CHECKING IF THE DATA IS AVAILABLE
        if (!language_id || !language) {
            return res.status(401).json({
                status: false,
                message: "can not make changes, language_id and language is required"
            });
        }

        // CHECKING IF FLUENCY IS NOT AVAILABLE THEN UPDATING ONLY LANGUAGE
        if (!fluency) {
            // SETTING UP QUERY TO UPDATE DATA IN DB IF FLUENCY IS NOT GIVEN
            const query = 'UPDATE languages SET language = $1 WHERE language_id = $2 RETURNING *';

            // UPDATING DATA IN DB USING QUERY ABOVE
            const languageUpdated = await pool.query(query, [
                language,
                language_id
            ]);
            if (!languageUpdated.rows[0]) {
                return res.status(401).json({
                    status: false,
                    message: "language could not be updated because language with this id does not exsists"
                });
            }
            return res.status(200).json({
                status: true,
                message: "language updated sucessfully",
                results: languageUpdated.rows[0]
            });
        }

        // SETTING UP QUERY TO UPDATE DATA IN DB
        const query = 'UPDATE languages SET language = $1, fluency = $2 WHERE language_id = $3 RETURNING *';

        // UPDATING DATA IN DB USING QUERY ABOVE
        const languageUpdated = await pool.query(query, [
            language,
            fluency,
            language_id
        ]);

        // CHECKING IF THE DATA WAS NOT UPDATED SUCESSFULLY THEN SENDING RESPONSE WITH STATUS FALSE
        if (!languageUpdated.rows[0]) {
            return res.status(401).json({
                status: false,
                message: "language could not be updated because language with this id does not exsists"
            });
        }

        res.status(200).json({
            status: true,
            message: "language updated sucessfully",
            results: languageUpdated.rows[0]
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.deleteLanguage = async (req, res) => {
    const db = await pool.connect();
    try {
        // DESTRUCTURE FROM REQUEST BODY
        const { language_id } = req.query;

        // CHECKING IF THE DATA IS AVAILABLE
        if (!language_id) {
            return res.status(401).json({
                status: false,
                message: "can not delete, language_id is required"
            });
        }

        // SETTING UP QUERY TO DELETE DATA IN DB
        const query = 'DELETE FROM languages WHERE language_id = $1';

        // DELETING DATA IN DB USING QUERY ABOVE
        const languageUpdated = await db.query(query, [
            language_id
        ]);

        // CHECKING IF THE DATA WAS NOT DELETED SUCESSFULLY THEN SENDING RESPONSE WITH STATUS FALSE
        if (languageUpdated.rowCount < 1) {
            return res.status(401).json({
                status: false,
                message: "language could not be deleted because language with this id does not exsists"
            });
        }
        // IF THE DATA WAS DELETED THEN SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "language deleted sucessfully",
            results: languageUpdated.rows[0]
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getAllLanguage = async (req, res) => {
    const db = await pool.connect();
    try {
        // SETTING UP QUERY TO FETCH ALL DATA FROM DB
        const query = 'SELECT * FROM languages';

        // FETCHING ALL DATA FROM DB USING QUERY ABOVE
        const allLanguages = await db.query(query);

        // CHECKING IF THE DATA WAS NOT FOUND SENDING RESPONSE WITH STATUS FALSE
        if (!allLanguages.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched"
            });
        }

        // IF THE DB WAS FETCHED SUCESSFULLY THEN SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "languages found sucessfully",
            results: allLanguages.rows
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getUserLanguage = async (req, res) => {
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
        const query = 'SELECT * FROM languages WHERE user_id = $1';

        // FETCHING DATA FROM DB USING QUERY ABOVE
        const userLanguages = await db.query(query, [user_id]);

        // CHECKING IF THE DATA WAS NOT FETCHED SENDING RESPONSE WITH STATUS FALSE
        if (!userLanguages.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched"
            });
        }

        // CHECKING IF THE DATA WAS FETCHED SUCESSFULLY SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "language Found sucessfully",
            results: userLanguages.rows
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getLanguageById = async (req, res) => {
    const db = await pool.connect();
    try {
        // DESTRUCTURE DATA FROM REQUEST QUERY
        const { language_id } = req.query;

        // CHECKING IF DATA IS RECIEVED
        if (!language_id) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched, because language_id is required"
            });
        }
        // SETTING UP QUERY TO FETCH USER OBJECTIVE FROM DB
        const query = 'SELECT * FROM languages WHERE language_id = $1';

        // FETCHING DATA FROM DB USING QUERY ABOVE
        const allLanguages = await db.query(query, [language_id]);

        // CHECKING IF THE DATA WAS NOT FETCHED SENDING RESPONSE WITH STATUS FALSE
        if (!allLanguages.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched"
            });
        }

        // CHECKING IF THE DATA WAS FETCHED SUCESSFULLY SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "objective Found sucessfully",
            results: allLanguages.rows
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}