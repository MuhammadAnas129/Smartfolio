const mongoose = require('mongoose');
const ResumeSchema = new mongoose.Schema({
    templatesFontFamily: { type: String, default: 'poppins' },
    changeColor: { type: String, default: '#3870B1' },
    currentState: { type: String, default: 'skill' },
    currentlyEmployeed: { type: Boolean, default: false },
    personalInformation: {
      name: String,
      email: String,
      phone: String,
      address: String,
      linkedin: String,
      image:String
    },
    educationInformation: [{
      title: String,
      institute: String,
      startedFrom: String,
      endedAt: String,
      description: String,
    }],
    experienceInformation: [{
      title: String,
      location: String,
      startedFrom: String,
      endedAt: String,
      description: String,
    }],
    skills: [{
      skill: String,
      level: String,
    }],
    languages: [{
      language: String,
      fluency: String,
    }],
    objectives: String,
    updated_at: {
        type: Date,
        default: Date.now()
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // userCvs: [Schema.Types.Mixed], // If you're storing an array of CVs or related objects
    // Additional fields as necessary
  });

// const Resume = mongoose.model('Resume', resumeSchema);
const Resume = mongoose.model('Resume', ResumeSchema);
module.exports = Resume;
