const CoverLetter = require('../../models/coverLetter')
exports.add = async (req, res) => {
    const { text, _id } = req.body
    try {
        if (!text || !_id) {
            return res.json({
                status: false,
                message: 'text and _id are required'
            })
        }
        const letter = new CoverLetter({ text, user: _id });
        await letter.save()
        res.json({
            status: true,
            message: 'Saved',
            result: letter
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
exports.update = async (req, res) => {
    const { text, _id } = req.body
    try {
        if (!text || !_id) {
            return res.json({
                status: false,
                message: 'text and _id are required'
            })
        }
        const letter = await CoverLetter.findOneAndUpdate({ _id }, { text, updated_at: Date.now() });
        res.json({
            status: true,
            message: 'Updated',
            result: letter
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
        const findLetters = await CoverLetter.find({ user: user_id }).populate('user')
        res.json({
            status: true,
            message: 'Fetched',
            result: findLetters
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
        const deleteLetter = await CoverLetter.findOneAndDelete({_id})
        res.json({
            status:false,
            message:'Deleted',
            result:deleteLetter
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}