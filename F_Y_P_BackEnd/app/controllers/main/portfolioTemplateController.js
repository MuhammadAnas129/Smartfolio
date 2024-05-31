const PortfolioTemplate = require('../../models/portfolioTemplate');


exports.postPortfolio = async (req, res) => {
    try {
        const { template_name } = req.body;
        const template_image = req.file.path;

        if (!template_name || !template_image) {
            return res.status(401).json({
                status: false,
                message: "Both template name and template image are required"
            });
        }

        const newTemplate = new PortfolioTemplate({
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

exports.getAllPortfolios = async (req, res) => {
    try {
        const templates = await PortfolioTemplate.find({});

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

exports.deletePortfolio = async (req, res) => {
    const { template_id } = req.query;
    try {
        if (!template_id) {
            return res.json({
                status: false,
                message: "Template_id is required"
            });
        }

        const deletedTemplate = await PortfolioTemplate.findByIdAndDelete(template_id);

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