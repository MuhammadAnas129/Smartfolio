const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors("*"));
app.use(express.json({ limit: "50mb" }));
// app.use("/", indexRouter);
app.use("/user", require("./app/routes/user/users"));
app.use("/cover-letter", require("./app/routes/main/coverLetterRoute"));

app.use("/uploads", express.static("uploads"));
app.use("/education", require("./app/routes/main/educationRoute"));
app.use("/languages", require("./app/routes/main/languageRoute"));
app.use("/objectives", require("./app/routes/main/objectiveRoute"));
app.use("/peronsalInfo", require("./app/routes/main/contact_detailRoute"));
// app.use("/resumes", require("./app/routes/main/resumeRoute"))
app.use("/skills", require("./app/routes/main/skillRoute"));
app.use("/workExperience", require("./app/routes/main/experienceRoute"));
app.use("/resumeTemplate", require("./app/routes/main/resumeTemplateRoute"));
app.use(
  "/portfolioTemplate",
  require("./app/routes/main/portfolioTemplateRoute")
);
app.use("/resume", require("./app/routes/main/resumeRoute"));
app.use("/portfolio", require("./app/routes/main/portfolioRoute"));
// app.use("/blogs", require("./app/routes/main/blogRoute"));
// app.use("/privacyPolicy", require("./app/routes/main/privacy_policyRoute"));
// app.use("/terms", require("./app/routes/main/terms_and_conditionsRoute"));
// ocr
app.use("/image-to-text", require("./app/routes/main/imageToTextRoute"));
// image upload
app.use("/imageUpload", require("./app/routes/ImageUpload/imageUploadRoute"));

// app.use("/about_us", require("./app/routes/main/about_usRoute"));
// app.use("/faq", require("./app/routes/main/faqRoute"));

// console.log(process.env.db)
mongoose.connect(process.env.db);

app.listen(process.env.PORT, () => {
  console.log("listening on port ", process.env.PORT);
});
