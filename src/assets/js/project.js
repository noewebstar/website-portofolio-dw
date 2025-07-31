function loadProjects() {
    const container = document.getElementsByClassName("row-content")[0];
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const warning = document.querySelector(".warning-alert");
    if (warning) {
      if (projects.length === 0) {
        warning.style.display = "flex";
      } else {
        warning.style.display = "none";
      }
    }
    container.innerHTML = "";
    projects.forEach((item, index) => {
      const col = document.createElement("div");
      col.classList.add("col-md-4");
      col.classList.add("mb-5");
      col.innerHTML = `
        <div class="card card-${index}">
          <img src="${item.image}" alt="Image" class="img-card">
          <div class="container-card">
              <p class="title">${item.title}</p>
              <p class="duration">durasi : ${item.duration}</p>
              <p class="description-card">${item.description}</p>
              <div class="card-bottom">
                  <div class="icon">
                    <i class="ic-card fa-brands fa-google-play ic fa-xl"></i>
                    <i class="ic-card fa-brands fa-android ic fa-xl"></i>
                    <i class="ic-card fa-brands fa-java ic fa-xl"></i>
                  </div>
                  <div class="col-button">
                    <button class="btn btn-edit btn-dark" data-index="{${index}}">Edit</button>
                    <button class="btn btn-delete btn-danger" data-index="${index}">Delete</button>
                  </div>
              </div>
          </div>
        </div>
      `;
      container.appendChild(col);
    });

  
     document.querySelectorAll(".btn-delete").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault(); 
        e.stopPropagation(); // 
        const index = this.getAttribute("data-index");
        confirmDelete(index);
      });
    });

     document.querySelectorAll(".btn-edit").forEach((button,index) => {
      button.addEventListener("click", function (e) {
        e.preventDefault(); 
        e.stopPropagation(); // 
        confirmEdit(index);
      });
    });

      
    document.querySelectorAll(".card").forEach((clickCard, index) => {
      clickCard.addEventListener("click", (e) => {
        // Cek jika yang diklik bukan tombol
        if (e.target.classList.contains("btn") || e.target.closest(".btn")) {
          return; // Jangan lakukan redirect jika klik di tombol
        }
        localStorage.setItem("id", index);
        window.location.href = "/detail";
      });
    });
      
   
  }
  

document.querySelector(".btn-add").addEventListener("click",()=>{
  localStorage.setItem("crud","add")  
  window.location.href = "/add_project"
})

function iconMap(tech) {
  const map = {
    nodejs: "node-js",
    nextjs: "react", 
    reactjs: "react",
    typescript: "js"
  };
  return map[tech] || "laptop-code";
}


function confirmEdit(index) {
  Swal.fire({
    title: "Yakin ingin Edit?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#151515",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, Edit!",
    cancelButtonText: "Batal"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("crud","edit")
      localStorage.setItem("id",index)
      window.location.href = "/add_project"
    }
  });
}


function confirmDelete(index) {
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data project ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.splice(index, 1); // hapus 1 item berdasarkan index
        localStorage.setItem("projects", JSON.stringify(projects));
        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          text: "Project berhasil dihapus.",
          timer: 1500,
          showConfirmButton: false
        });
        loadProjects(); // reload ulang tampilan
      }
    });
  }

window.onload = loadProjects;
