import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

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
  res.render("contact", { title: "Contact" });
});


export default router;
