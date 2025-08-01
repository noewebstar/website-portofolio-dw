import express from "express";
import { contactPage, homePage } from "./controller/home.js";
import {
  login,
  logout,
  register,
  showLoginPage,
  showRegisterPage,
} from "./controller/auth.js";
import {
  createProject,
  deleteProject,
  getDetailProject,
  showAddProject,
  showEditProject,
  showMyProject,
  updateProject,
} from "./controller/project.js";
import { isAuthenticated } from "./middleware/authentication.js";
import { upload } from "./middleware/uploadData.js";
const router = express.Router();

router.get("/", homePage);
router.get("/login", showLoginPage);
router.get("/register", showRegisterPage);
router.post("/register", register);
router.post("/login", login);
router.get("/myproject", showMyProject);
router.get("/contact", contactPage);

router.get("/add_project", isAuthenticated, showAddProject);
router.post(
  "/add_project",
  isAuthenticated,
  upload.single("image"),
  createProject
);

router.post("/project/delete/:id", isAuthenticated, deleteProject);
router.get("/project/:id", getDetailProject);
router.get("/project/edit/:id", isAuthenticated, showEditProject);
router.post(
  "/project/update/:id",
  upload.single("image"),
  isAuthenticated,
  updateProject
);
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phoneNumber, subject, message } = req.body;
    await Contact.create({ name, email, phoneNumber, subject, message });

    res.render("contact", {
      layout: false,
      title: "Contact",
      phoneNumber,
      status: true,
      message: "Data berhasil dikirim!",
    });
  } catch (err) {
    res.status(500).send("Error submitting contact form: " + err.message);
  }
});
router.get("/logout", isAuthenticated, logout);

export default router;
