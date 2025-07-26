
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import route from "./src/routers.js";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));

app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, "src", "assets")));
app.use("/", route);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

