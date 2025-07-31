import express from "express";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import db from "../models/index.js";

const { Contact } = db;
const { User } = db;
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simpan user sementara di memory (bisa diganti DB)
const users = [];

// Middleware: Cek apakah user login
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
}

// =======================
// Halaman Utama
// =======================

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/myproject", (req, res) => {
  res.render("myproject", { title: "My Project" });
});

router.get("/add_project", isAuthenticated, (req, res) => {
  res.render("add_project", { title: "Add Project" });
});

router.get("/detail", (req, res) => {
  res.render("detail", { title: "Detail" });
});

// =======================
// Halaman Kontak
// =======================

router.get("/contact", (req, res) => {
  const phoneNumber = "+62 812 3456 7890"; 
  res.render("contact", {
    layout: false,
    title: "Contact",
    phoneNumber,
    status: false,
    message: ""
  });
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phoneNumber, subject, message } = req.body;
    await Contact.create({ name, email, phoneNumber, subject, message });

    res.render("contact", {
      layout: false,
      title: "Contact",
      phoneNumber,
      status: true,
      message: "Data berhasil dikirim!"
    });
  } catch (err) {
    res.status(500).send("Error submitting contact form: " + err.message);
  }
});

// =======================
// Authentication Routes
// =======================

router.get("/login", (req, res) => {
  res.render("login", { title: "Login", error: null });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.render("login", {
      title: "Login",
      error: "Email tidak ditemukan",
      email,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render("login", {
      title: "Login",
      error: "Password salah",
      email,
    });
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  res.redirect("/add_project");
});


router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    return res.render("register", {
      title: "Register",
      error: "Email sudah terdaftar",
      name,
      email,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });

  res.render("register", {
    title: "Register",
    success: "Registrasi berhasil! Silakan login.",
  });
});

export default router;
