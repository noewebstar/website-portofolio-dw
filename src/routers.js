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
  res.render("contact", { title: "Contact", phoneNumber });
});

router.post("/contact", async (req, res) => {
  const { name, email, number, subject, message } = req.body;

  try {
    await Contact.create({
      name,
      email,
      phoneNumber: number,
      subject,
      message,
    });

    res.redirect("/contact");
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
