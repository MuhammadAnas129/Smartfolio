// const {pool} = require("../../config/db.config");
const Template = require('../../models/template');



exports.postResume = async (req, res) => {
    try {
        const { template_name } = req.body;
        const template_image = req.file.path;

        if (!template_name || !template_image) {
            return res.status(401).json({
                status: false,
                message: "Both template name and template image are required"
            });
        }

        const newTemplate = new Template({
            templateName: template_name, // Adjust the field names as per your MongoDB model
            templateImage: template_image
        });

        const savedTemplate = await newTemplate.save();

        res.status(200).json({
            status: true,
            message: "Saved Successfully",
            results: savedTemplate
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err
        });
    }
};

exports.getAllResumes = async (req, res) => {
    try {
        const templates = await Template.find({});

        if (!templates.length) {
            return res.status(401).json({
                status: false,
                message: "Template not fetched successfully"
            });
        }

        res.status(200).json({
            status: true,
            message: "Fetched Successfully",
            results: templates
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err
        });
    }
};

exports.deleteResume = async (req, res) => {
    const { template_id } = req.query;
    try {
        if (!template_id) {
            return res.json({
                status: false,
                message: "Template_id is required"
            });
        }

        const deletedTemplate = await Template.findByIdAndDelete(template_id);

        if (!deletedTemplate) {
            return res.status(401).json({
                status: false,
                message: "Template not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "Deleted Successfully"
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err
        });
    }
};



// exports.postResume = async (req,res)=>{
//     try {
//         const {template_name} = req.body;
//         const template_image = req.file.path;

//         if(!template_name || !template_image){
//             return res.status(401).json({
//                 status: false,
//                 message:"Both template name and template image are required"
//             });
//         }

//         const query = 'INSERT INTO templates (template_name, template_image) VALUES ($1, $2) RETURNING *';
//         const savedTemplate = await pool.query(query, [template_name,template_image]);
//         if(!savedTemplate.rows[0]){
//             return res.status(401).json({
//                 status: false,
//                 message:"Template not saved sucessfully"
//             });
//         }
        
//         res.status(200).json({
//             status: true,
//             message:"Saved Sucessfully",
//             results: savedTemplate.rows[0]
//         })
//     } catch (err) {
//         return res.status(500).json({
//             status: false,
//             message:"Internal Server Error",
//             error:err
//         });
//     }
// }
// exports.getAllResumes = async (req,res)=>{
//     // const db = await pool.connect()
//     try {
//         const query = 'SELECT * FROM templates'
//         const templates = await pool.query(query)

//         if(!templates.rows[0]){
            
//             return res.status(401).json({
//                 status: false,
//                 message:"Template not fetched sucessfully"
//             });
//         }
//         res.status(200).json({
//             status: true,
//             message:"Fetched Sucessfully",
//             results: templates.rows
//         })
//     } catch (err) {
//         return res.status(500).json({
//             status: false,
//             message:"Internal Server Error",
//             error:err
//         });
//     }
// }
// exports.deleteResume = async (req,res)=>{
//     const {template_id} = req.query
//     try {
//         if(!template_id){
//             return res.json({
//                 status: false,
//                 message:"Template_id is required"
//             });
//         }
//         const query = 'DELETE FROM templates WHERE template_id = $1'
//         const templates = await pool.query(query, [template_id])

//         if(!templates.rows[0]){
            
//             return res.status(401).json({
//                 status: false,
//                 message:"Template not found sucessfully"
//             });
//         }
//         res.status(200).json({
//             status: true,
//             message:"Deleted Sucessfully",
//             results: templates.rows
//         })
//     } catch (err) {
//         return res.status(500).json({
//             status: false,
//             message:"Internal Server Error",
//             error:err
//         });
//     }
// }