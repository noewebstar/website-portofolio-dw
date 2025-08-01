import db from "../../models/index.js";
const { Project, ProjectAttribute } = db;
import jwt from "jsonwebtoken";

export const showMyProject = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: ProjectAttribute,
          as: "attributes",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    const token = req.cookies.token;
    res.render("pages/myproject", {
      layout: "layout/main_layout",
      title: "My Projects",
      projects,
      token: token !== undefined ? true : false,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.render("pages/myproject", {
      layout: "layout/main_layout",
      title: "My Projects",
      error: "Gagal mengambil data project",
      projects: [],
    });
  }
};

export const showAddProject = (req, res) => {
  res.render("pages/add_project", {
    layout: "layout/main_layout",
  });
};

export const showEditProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Ambil project berdasarkan ID, termasuk attributes
    const project = await Project.findByPk(id, {
      include: [
        {
          model: ProjectAttribute,
          as: "attributes",
        },
      ],
    });

    if (!project) {
      return res.status(404).send("Project not found");
    }

    res.render("pages/edit_project", {
      layout: "layout/main_layout",
      project,
      isEdit: true, // Flag untuk bedakan antara add/edit di HBS
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { projectName, startDate, endDate, description, tech } = req.body;

    const image = req.file ? req.file.filename : null;

    // Update project
    await Project.update(
      {
        projectName,
        startDate,
        endDate,
        description,
        ...(image && { image }), // update image hanya jika upload baru
      },
      {
        where: { id: projectId },
      }
    );

    // Hapus attribute lama
    await ProjectAttribute.destroy({
      where: { projectId },
    });

    // Tambah attribute baru
    if (tech && tech.length > 0) {
      const newAttributes = Array.isArray(tech)
        ? tech.map((name) => ({ name, projectId }))
        : [{ name: tech, projectId }];

      await ProjectAttribute.bulkCreate(newAttributes);
    }

    res.redirect("/myproject");
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).send("Server Error");
  }
};

export const createProject = async (req, res) => {
  const { projectName, startDate, endDate, description, tech } = req.body;
  const image = req.file ? req.file.filename : null;
  try {
    const project = await Project.create({
      projectName,
      startDate,
      endDate,
      description,
      image,
    });
    const selectedTechs = Array.isArray(tech) ? tech : [tech];
    const attributes = selectedTechs.map((item) => ({
      name: item,
      projectId: project.id,
    }));

    await ProjectAttribute.bulkCreate(attributes);

    res.redirect("/myproject");
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).send("Gagal menambahkan project");
  }
};

export const getDetailProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const project = await Project.findOne({
      where: { id },
      include: [
        {
          model: ProjectAttribute,
          as: "attributes", // harus sama dengan alias di relasi hasMany
        },
      ],
    });

    if (!project) {
      return res.status(404).send("Project not found");
    }

    res.render("pages/detail", {
      layout: "layout/main_layout", // atau false kalau tidak pakai layout
      title: "Detail Project",
      project,
    });
  } catch (error) {
    console.error("Error getDetailProject:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Hapus project attribute terlebih dahulu (jika ada relasi hasMany)
    await ProjectAttribute.destroy({
      where: { projectId: id },
    });

    // Lalu hapus project-nya
    const deleted = await Project.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).send("Project not found");
    }

    res.redirect("/myproject"); // Redirect ke halaman project
  } catch (error) {
    console.error("Error deleteProject:", error);
    res.status(500).send("Internal Server Error");
  }
};
