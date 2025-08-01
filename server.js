import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import route from "./src/routers.js";
import hbs from "hbs";
import cookieParser from "cookie-parser";
import { setUserToLocals } from "./src/middleware/authentication.js";
import dotenv from "dotenv";
import { MyProjectEachProject } from "./src/helpers/eachProject.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "secret_rahasia_noe",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  "/fontawesome",
  express.static(
    path.join(__dirname, "node_modules/@fortawesome/fontawesome-free")
  )
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, "src/assets")));
hbs.registerPartials(path.join(__dirname, "src/views/component"));
hbs.registerHelper("ifCond", MyProjectEachProject);
hbs.registerHelper("eq", function (a, b) {
  return a === b;
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(setUserToLocals);
app.use("/", route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
//
