export const homePage = (req, res) => {
  res.render("pages/index", {
    layout: "layout/main_layout",
    active: "",
    title: "home",
  });
};

export const contactPage = (req, res) => {
  res.render("pages/contact", {
    layout: "layout/main_layout",
    active: "",
    title: "Contact",
  });
};
