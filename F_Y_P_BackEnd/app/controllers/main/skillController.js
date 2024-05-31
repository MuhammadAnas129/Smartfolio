const { pool } = require("../../config/db.config");
exports.addSkill = async (req, res) => {
    try {
        // DESTRUCTURE FROM REQUEST BODY
        const { skill, level, user_id } = req.body;
        // CHECKING IF DATA IS NOT AVAILABLE RETURNING THE RESPONSE WITH STATUS FALSE
        if (!skill || !user_id) {
            return res.status(401).json({
                status: false,
                message: "Skill can not be added. Both skill and user_id are required"
            });
        }

        // SETTING UP QUERY TO ADD THE LANGUAGE
        const query = 'INSERT INTO skills (skill, level, user_id) VALUES ($1, $2, $3) RETURNING *';

        // ADDING THE DATA USING QUERY ABOVE
        const savedSkill = await pool.query(query, [
            skill,
            level ? level : '',
            user_id]);

        // CHECKING IF THE DATA WAS ADDED SUCESSFULLY
        if (!savedSkill.rows[0]) {
            return res.status(401).json({
                status: false,
                message: "Skill can not be added due to unknown reason while saving in db"
            });
        }

        // SEDNING RESPONSE IF THE DATA WAS ADDED SUCESSFULLY
        res.status(200).json({
            status: true,
            message: "Skill added sucessfully",
            results: savedSkill.rows[0]
        });



    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.editSkill = async (req, res) => {
    const {skill,level,skill_id} = req.body
    try {
        if(!skill_id){
            return res.json({
                status:false,
                message:'Skill id is required'
            })
        }
        const result = await pool.query(`UPDATE skills SET skill = $1, level = $2 WHERE skill_id = $3 RETURNING *`,[skill,level,skill_id])
        if(result.rowCount<1){
            return res.json({
                status:false,
                message:'Skill not found'
            })
        }
        res.json({
            status:true,
            message:'Skill updated',
            result:result.rows[0]
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.deleteSkill = async (req, res) => {
    const {skill_id} = req.query
    try {
        if(!skill_id){
            return res.json({
                status:false,
                message:'Skill id is required'
            })
        }
        const result = await pool.query(`DELETE FROM skills WHERE skill_id = $1 RETURNING *`,[skill_id])
        if(result.rowCount<1){
            return res.json({
                status:false,
                message:'Skill not found'
            })
        }
        res.json({
            status:true,
            message:'Skill Deleted',
            result:result.rows[0]
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getAllSkill = async (req, res) => {
    const db = await pool.connect();
    try {

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getUserSkill = async (req, res) => {
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
        const query = 'SELECT * FROM skills WHERE user_id = $1';

        // FETCHING DATA FROM DB USING QUERY ABOVE
        const userSkills = await pool.query(query, [user_id]);

        // CHECKING IF THE DATA WAS NOT FETCHED SENDING RESPONSE WITH STATUS FALSE
        if (!userSkills.rows[0]) {
            return res.status(404).json({
                status: false,
                message: "No Data was fetched"
            });
        }

        // CHECKING IF THE DATA WAS FETCHED SUCESSFULLY SENDING RESPONSE WITH STATUS TRUE
        res.status(200).json({
            status: true,
            message: "language Found sucessfully",
            results: userSkills.rows
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}
exports.getSkillById = async (req, res) => {
    const {skill_id} = req.query
    try {
        if(!skill_id){
            return  res.json({
                status:false,
                message:'Skill_id required'
            })
        }
        const result = await pool.query(`SELECT * FROM skills WHERE skill_id = $1`,[skill_id])
        if(result.rowCount<1){
            return res.json({
                status:false,
                message:'Skill not found'
            })
        }
        res.json({
            status:true,
            message:'Skill found',
            result:result.rows[0]
        })
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
}