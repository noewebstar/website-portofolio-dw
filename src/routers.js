import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import db from "../models/index.js";
const { Contact } = db;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/myproject", (req, res) => {
  res.render("myproject", { title: "My Project" });
});

router.post("/add_project", (req, res) => {
  const { projectName, startDate, endDate, description, tech } = req.body;
  console.log("New Project:", { projectName, startDate, endDate, description, tech });
  res.redirect("/myproject");
});

router.get("/add_project", (req, res) => {
  res.render("add_project", { title: "Add Project" });
});

router.get("/detail", (req, res) => {
  res.render("detail", { title: "Detail" });
});

router.get("/contact", (req, res) => {
  const phoneNumber = "+62 812 3456 7890"; 
  res.render("contact", {
    layout: false,        
    title: "Contact",      
    phoneNumber,
    status : false,
    message : ""           
  });
});



router.post("/contact", async (req, res) => {
  try {
    const { name, email, phoneNumber, subject, message } = req.body;
    await Contact.create({ name, email, phoneNumber, subject, message });
    
    res.render('contact',{
      "status":true,
      "message": "data berhasil di kirim!"
    })
  } catch (err) {
    res.status(500).send("Error submitting contact form: " + err.message);
  }
});


export default router;
// 