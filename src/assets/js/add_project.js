function calculateDuration(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  const days = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
  return days + " hari";
}

const inputFileContainer = document.querySelector(".input-file");
const fileInput = document.getElementById("fileInput");
const valInputUpload = document.querySelector(".value-input-upload");

inputFileContainer.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    valInputUpload.innerHTML = fileName;
  }
});
