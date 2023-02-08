import express from "express";
import homController from "../controller/homeController";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });
let router = express.Router();

const initWebRouter = (app) => {
  router.get("/", homController.getHomepage);
  router.get("/detail/user/:id", homController.getDetailPage);
  router.post("/create-new-user", homController.createNewUser);
  router.post("/delete-user", homController.deleteUser);
  router.get("/edit-user/:id", homController.getEditPage);
  router.post("/update-user", homController.postUpdateUser);

  router.get("/upload", homController.getUploadFilePage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homController.handleUploadFile
  );
  router.get("/", (req, res) => {
    res.render("index.ejs");
  });

  return app.use("/", router);
};
module.exports = initWebRouter;
