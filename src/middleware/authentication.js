import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.SECRET_KEY;

export const setUserToLocals = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const user = jwt.verify(token, JWT_SECRET);
      res.locals.user = user;
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
};

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};
