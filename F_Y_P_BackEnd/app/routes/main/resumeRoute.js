// const express = require('express');
// const router = express.Router();
var router = require("express").Router();
const User = require("../../controllers/main/resumeController");
const controller = require("../../controllers/main/resumeController");

// router.get('/' , (req, res) => {
//     res.send('Hello Usman from router js');
//  });

//Async-Await

router.post("/contactdetails", async (req, res) => {
  // console.log(req.body);
  const {
    firstname,
    surname,
    profession,
    city,
    country,
    postalcode,
    phone,
    email,
    jobtitle,
    employer,
    city1,
    country1,
    startdate,
    enddate,
    schoolname,
    schoollocation,
    degree,
    fieldofstudy,
    graduationstartdate,
    graduationenddate,
  } = req.body;

  if (
    !firstname ||
    !surname ||
    !profession ||
    !city ||
    !country ||
    !postalcode ||
    !phone ||
    !email ||
    !jobtitle ||
    !employer ||
    !city ||
    !country ||
    !startdate ||
    !enddate ||
    !schoolname ||
    !schoollocation ||
    !degree ||
    !fieldofstudy ||
    !graduationstartdate ||
    !graduationenddate
  ) {
    return res.status(422).json({
      error: "plz filled the field properly",
    });
  }

  try {
    const user = new User({
      firstname,
      surname,
      profession,
      city,
      country,
      postalcode,
      phone,
      email,
      jobtitle,
      employer,
      city1,
      country1,
      startdate,
      enddate,
      schoolname,
      schoollocation,
      degree,
      fieldofstudy,
      graduationstartdate,
      graduationenddate,
    });

    await user.save();

    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-resume", controller.addResumes);
router.put("/update-resume", controller.updateResumes);
router.delete("/delete-resume", controller.deleteResume);
// router.get("/get-all-resumes");
router.get("/get-resumes", controller.getUserResumes);
// router.get("/get-resumes-by-id", controller.getResumesById);

module.exports = router;
