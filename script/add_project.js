document.querySelector(".button-submit").addEventListener("click", function (e) {
  e.preventDefault();

  const getCrud = localStorage.getItem("crud");
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  const handleProject = (base64Image) => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    const projectData = {
      title: document.getElementById("projectName").value,
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
      description: document.getElementById("description").value,
      duration: calculateDuration(
        document.getElementById("startDate").value,
        document.getElementById("endDate").value
      ),
      techs: Array.from(document.querySelectorAll("input[name='tech']:checked")).map(
        (input) => input.value
      ),
      image: base64Image,
    };

    if (getCrud === "add") {
      // ADD PROJECT
      projectData.id = projects.length;
      projects.push(projectData);
    } else if (getCrud === "edit") {
      // EDIT PROJECT
      const editId = parseInt(localStorage.getItem("id"));
      projectData.id = editId;
      projects[editId] = projectData;
    }

    localStorage.setItem("projects", JSON.stringify(projects));

    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: getCrud === "add" ? 'Project berhasil disimpan!' : 'Project berhasil diperbarui!',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      document.querySelector("form").reset();
      window.location.href = "/pages/myproject.html";
    });
  };

  // Handle file reading (for image)
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64Image = event.target.result;
      handleProject(base64Image);
    };
    reader.readAsDataURL(file);
  } else {
    if (getCrud === "edit") {
      // Jika sedang edit dan tidak ganti gambar, ambil gambar lama
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const editId = parseInt(localStorage.getItem("id"));
      const oldImage = projects[editId]?.image || "";
      handleProject(oldImage);
    } else {
      // Kalau sedang add, tapi gambar belum dipilih
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Silakan pilih file gambar terlebih dahulu.',
      });
    }
  }
});
  
  function calculateDuration(start, end) {
    const s = new Date(start);
    const e = new Date(end);
    const days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return days + " hari";
  }
  
  const inputFileContainer = document.querySelector(".input-file");
  const fileInput = document.getElementById("fileInput")
  const valInputUpload = document.querySelector(".value-input-upload")

  inputFileContainer.addEventListener("click",()=>{
    fileInput.click()
  })

  fileInput.addEventListener("change", ()=>{
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      valInputUpload.innerHTML = fileName;
    }
  })


  window.addEventListener("DOMContentLoaded", () => {

    const getCrud = localStorage.getItem("crud");
    const editId = parseInt(localStorage.getItem("id"));
  
    if (getCrud === "edit") {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];
      const data = projects[editId];
      console.log(editId)
  
      if (data) {
        document.getElementById("projectName").value = data.title;
        document.getElementById("startDate").value = data.startDate;
        document.getElementById("endDate").value = data.endDate;
        document.getElementById("description").value = data.description;
  
        // Tampilkan durasi jika perlu
        const durationEl = document.getElementById("durationDisplay");
        if (durationEl) {
          durationEl.innerText = data.duration;
        }
  
        // Ceklis tech yang cocok
        const techCheckboxes = document.querySelectorAll("input[name='tech']");
        techCheckboxes.forEach((checkbox) => {
          checkbox.checked = data.techs.includes(checkbox.value);
        });
  
        // Tampilkan nama file dan preview image (jika tersedia)
        const valInputUpload = document.querySelector(".value-input-upload");
        const previewImage = document.querySelector(".preview-image");
  
        if (data.image) {
          valInputUpload.innerText = "Gambar telah dipilih sebelumnya";
          if (previewImage) {
            previewImage.src = data.image;
            previewImage.style.display = "block";
          }
        }
      }
    }
  });