function loadProjects(){
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const id = localStorage.getItem("id")
    const showData = projects[id]
    document.querySelector(".image-detail").src = showData.image
    document.querySelector(".title").innerHTML = showData.title
    document.querySelector(".duration").textContent = showData.duration
    document.querySelector(".startDate").textContent = convertDate(showData.startDate)
    document.querySelector(".endDate").textContent = convertDate(showData.endDate)
    document.querySelector(".description-value").innerHTML = showData.description
    for(let i = 0;i<showData.techs.length;i++){
        const tech = showData.techs[i] 
        document.querySelector(".tech-icons").innerHTML += showIcon(showData.techs[i])
    }
}

function convertDate(inputDate){
    const date = new Date(inputDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'long' }); // "July"
    const year = date.getFullYear();

    const formatted = `${day} ${month} ${year}`;
    return formatted   
}

function showIcon(type) {
    switch (type) {
      case "nodejs":
        return `<div><i class="fa-brands fa-node-js ic-card"></i> ${type}</div>`;
      case "nextjs":
        return `<div><i class="fa-brands fa-js ic-card"></i> ${type}</div>`; // pakai JS icon utk nextjs
      case "reactjs":
        return `<div><i class="fa-brands fa-react ic-card"></i> ${type}</div>`;
      case "typescript":
        return `<div><i class="fa-solid fa-code ic-card"></i> ${type}</div>`;
      default:
        return "";
    }
  }


window.onload = loadProjects;