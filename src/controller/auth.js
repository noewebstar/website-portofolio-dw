import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../models/index.js";

const { User } = db;
const JWT_SECRET = process.env.SECRET_KEY || "ASNDAJSND1239";

// GET halaman register
export const showRegisterPage = (req, res) => {
  res.render("pages/register", {
    title: "Register",
  });
};

// POST register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render("pages/register", {
        title: "Register",
        error: "Email sudah terdaftar",
        name,
        email,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    console.error("Register error:", error);
    res.render("pages/register", {
      title: "Register",
      error: "Terjadi kesalahan saat register",
    });
  }
};

// GET halaman login
export const showLoginPage = (req, res) => {
  res.render("pages/login", {
    title: "Login",
  });
};

// POST login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("pages/login", {
        title: "Login",
        error: "Email tidak ditemukan",
        email,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("pages/login", {
        title: "Login",
        error: "Password salah",
        email,
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET
    );

    // Simpan token ke cookie (butuh cookie-parser di app.js)
    res.cookie("token", token);
    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    res.render("pages/login", {
      title: "Login",
      error: "Terjadi kesalahan saat login",
    });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
