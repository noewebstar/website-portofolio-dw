const express = require("express")
const router = express.Router()
const path = require("path")
const fs =require("fs")


router.get("/", (req, res) => {
    const htmlPath = path.join(__dirname, "../","public", "pages", "index.html");
    fs.readFile(htmlPath, "utf8", (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal membaca file HTML");
      }
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    });
  });

router.get("/project", (req, res) => {
    const htmlPath = path.join(__dirname, "../","public", "pages", "myproject.html");
    fs.readFile(htmlPath, "utf8", (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal membaca file HTML");
      }
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    });
});

router.get("/contact", (req, res) => {
    const htmlPath = path.join(__dirname, "../","public", "pages", "contact.html");
    fs.readFile(htmlPath, "utf8", (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal membaca file HTML");
      }
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    });
});

router.get("/detail", (req, res) => {
    const htmlPath = path.join(__dirname, "../","public", "pages", "detail.html");
    fs.readFile(htmlPath, "utf8", (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal membaca file HTML");
      }
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    });
});

router.get("/add_project", (req, res) => {
    const htmlPath = path.join(__dirname, "../","public", "pages", "add_project.html");
    fs.readFile(htmlPath, "utf8", (err, html) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal membaca file HTML");
      }
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    });
});




module.exports = router