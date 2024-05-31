const Resume = require('../../models/resume');

exports.add = async (req, res) => {
    // const { firstname, surname, profession, city, country, postalcode, phone, email, jobtitle, 
    //     employer, city1, country1, startdate, enddate, schoolname, schoollocation, degree, fieldofstudy, graduationstartdate, 
    //     graduationenddate  } = req.body
    const { resume, _id  } = req.body
    try {
        if (!resume || !_id) {
            return res.json({
                status: false,
                message: 'Fields are required'
            })
        }
        const Resume = new Resume({ resume, user: _id });
        await Resume.save()
        res.json({
            status: true,
            message: 'Saved',
            result: Resume
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
exports.update = async (req, res) => {
    const { firstname, surname, profession, city, country, postalcode, phone, email, jobtitle, 
        employer, city1, country1, startdate, enddate, schoolname, schoollocation, degree, fieldofstudy, graduationstartdate, 
        graduationenddate, _id } = req.body
    try {
        if (! firstname || !surname || !profession || !city || !country || !postalcode || !phone || !email || !jobtitle ||
            !employer || !city1 || !country1 || !startdate || !enddate || !schoolname || !schoollocation || !degree || !fieldofstudy
            || !graduationstartdate ||  !graduationenddate || !_id) {
            return res.json({
                status: false,
                message: 'Fields are required'
            })
        }
        const letter = await Resume.findOneAndUpdate({ _id }, { firstname, surname, profession, city, country, postalcode, phone, email, jobtitle, 
            employer, city1, country1, startdate, enddate, schoolname, schoollocation, degree, fieldofstudy, graduationstartdate, 
            graduationenddate, updated_at: Date.now() });
        res.json({
            status: true,
            message: 'Updated',
            result: Resume
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
exports.get = async (req, res) => {
    const { user_id } = req.query
    try {
        if (!user_id) {
            return res.json({
                status: false,
                message: 'user_id is required'
            })
        }
        const findResume = await Resume.find({ user: user_id }).populate('user')
        res.json({
            status: true,
            message: 'Fetched',
            result: findResume
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
exports.delete = async (req, res) => {
    const {_id}=req.query
    try {
        if(!_id){
            return res.json({
                status:false,
                message:'_id is required'
            })
        }
        const Resumedelete = await Resume.findOneAndDelete({_id})
        res.json({
            status:false,
            message:'Deleted',
            result:Resumedelete
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
exports.addResumes = async (req, res) => {
    console.log("Req body: ", req.body);

    const { resume, skillInformation, languageInformation, educationformation, experienceInformation, personalInformation, objectives, _id  } = req.body
    try {
        if (!resume || !_id) {
            return res.json({
                status: false,
                message: 'Fields are required'
            })
        }
        console.log("Adding Resume!");
        // console.log("Resume: ", resume);
        const myResume = new Resume({ 
            templatesFontFamily: resume.templatesFontFamily,
            changeColor: resume.changeColor,
            currentState: resume.currentState,
            currentlyEmployeed: resume.currentlyEmployeed,
            personalInformation: personalInformation,
            educationInformation: educationformation,
            experienceInformation: experienceInformation,
            skills: skillInformation,
            languages: languageInformation,
            objectives: objectives,
            user: _id
        });
        await myResume.save();
        // console.log("Resume: ", myResume);
        console.log("Resume saved!");
        res.json({
            status: true,
            message: 'Saved',
            result: myResume
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
exports.updateResumes = async (req, res) => {
    const { _id, updateData } = req.body;
    try {
        const updatedResume = await Resume.findOneAndUpdate({ _id }, updateData, { new: true });
        res.json({ status: true, message: 'Updated', result: updatedResume });
    } catch (error) {
        console.log("Error updating resume: ", error);
        res.json({ status: false, message: error.message });
    }
}
exports.deleteResume = async (req, res) => {

    const { _id } = req.query;
    try {
        const deletedResume = await Resume.findOneAndDelete({ _id });
        res.json({ status: true, message: 'Deleted', result: deletedResume });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
}
exports.getUserResumes = async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.status(404).json({
                status: false,
                message: "User id must be provided"
            });
        }


        // Fetching resume from DB
        const resumes = await Resume.find({ user: user_id });

        res.status(200).json({
            status: true,
            message: "Resume found",
            results: resumes
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: err.message
        });
    }
}
