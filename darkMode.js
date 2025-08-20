const mode = document.getElementById("light-mode");

const titles = document.querySelectorAll(".title");
const calendarCont = document.querySelector(".calendar-container");
const DateNames = document.querySelectorAll(".dates");

const first = document.querySelector(".title");
const second = document.getElementById("ThisWeeksDays");
const third  = document.getElementById("NextWeeksDays");
const fourth = document.getElementById("UpcomingWeeksDays");

const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const d = document.getElementById("d");

const edits = document.querySelectorAll(".edit-category, .edit-name, .edit-start-date, .edit-due-date");

const currentPage  = document.getElementById("CurrentPage");
const aCurrentPage = document.getElementById("aCurrentPage");
const bCurrentPage = document.getElementById("cCurrentPage"); 

const taskCard = document.querySelectorAll(".task-card");

const inputs = document.querySelectorAll(".xxx");


const THEME_KEY = "taskmgr_theme"; 

let saved = localStorage.getItem(THEME_KEY);
if (!saved) {
  saved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  localStorage.setItem(THEME_KEY, saved);
}

let flag = (saved === "light");

function display() {
  localStorage.setItem(THEME_KEY, flag ? "light" : "dark");

  const cells = document.querySelectorAll(".day, .xday, .notday");

    const allDivs = document.querySelectorAll("div");
    const allPara = document.querySelectorAll("p");
    const alltasks = document.querySelectorAll(".tasking");

  if (flag){
    // LIGHT MODE
    document.body.style.background =
      "radial-gradient(circle at top left, rgba(179,136,255,0.35), transparent 70%)," +
      "radial-gradient(circle at bottom right, rgba(0,229,195,0.55), transparent 70%), #F5F5F5";
    document.body.style.color = "#000000";
        
    titles.forEach(t => { t.style.color = "#000000"; });

    first?.style.setProperty("text-decoration-color", "#ff0000");
    a?.style.setProperty("border", "solid 2px #ff0000");  
    a?.style.setProperty("background", "rgba(254, 202, 202, 0.6)");

    second?.style.setProperty("text-decoration-color", "#FACC15");
    b?.style.setProperty("border", "solid 2px #FACC15");
    b?.style.setProperty("background", "rgba(250, 204, 21, 0.25)");

    third?.style.setProperty("text-decoration-color", "#34D399");
    c?.style.setProperty("border", "solid 2px #34D399");
    c?.style.setProperty("background", "rgba(167, 243, 208, 0.7)");

    fourth?.style.setProperty("text-decoration-color", "#A78BFA");
    d?.style.setProperty("border", "solid 2px #A78BFA");
    d?.style.setProperty("background", "rgba(221, 214, 254, 0.7)");

    currentPage?.style.setProperty("color", "#000000");
    aCurrentPage?.style.setProperty("color", "#000000");
    bCurrentPage?.style.setProperty("color", "#000000");

    calendarCont?.style?.setProperty("background", "rgba(255, 255, 255, 0.75)"); 
    calendarCont?.style?.setProperty("color", "#111827");
    calendarCont?.style?.setProperty("border", "1px solid #E5E7EB");

    DateNames.forEach(dates => {
        dates?.style?.setProperty("color", "#000000");
    });

    
    cells.forEach(cell => {
        if (cell.classList.contains("day")) {
            cell.style.background = "#FFFFFF";        
            cell.style.border = "1px solid #E5E7EB";  
        } else if (cell.classList.contains("xday")) {
            cell.style.background = "#FFEDD5";         
            cell.style.border = "2px solid #F59E0B";
        } else if (cell.classList.contains("notday")) {
            cell.style.background = "#E5E7EB";        
            cell.style.border = "1px solid #D1D5DB";
        }
        
    });

    allDivs.forEach(div => {
        div?.style?.setProperty("color", "#000000");
    });
    
    allPara.forEach(p => {
        p?.style?.setProperty("color", "#000000");
    });
    
    alltasks.forEach(p => {
        p?.style?.setProperty("background-color", "rgba(0, 0, 0, 0.04)");
    });

    taskCard.forEach(card => {
        card?.style?.setProperty("background", "rgba(255, 255, 255, 0.5)"); 
    });

    inputs.forEach(input => {
        input?.style?.setProperty("background", "rgba(255, 255, 255, 0.5)"); 
        input?.style?.setProperty("color", "#000000"); 
    });

    edits.forEach(input => {
        input?.style?.setProperty("background", "rgba(255, 255, 255, 0.5)"); 
        input?.style?.setProperty("color", "#000000"); 
    });

  } else {

    // DARK MODE
    document.body.style.background =
      "radial-gradient(circle at top left, rgba(179,136,255,0.35), transparent 70%), " +
      "radial-gradient(circle at bottom right, rgba(0,229,195,0.25), transparent 70%), #1C1C1E";
    document.body.style.color = "#F2F2F2";

    titles.forEach(t => { t.style.color = "#F2F2F2"; });

    first?.style.setProperty("text-decoration-color", "#ff0000");
    a?.style.setProperty("border", "solid 2px #ff0000");  
    a?.style.setProperty("background", "#582E2E");

    second?.style.setProperty("text-decoration-color", "#FFEB66");
    b?.style.setProperty("border", "solid 2px #FFEB66");
    b?.style.setProperty("background", "#5E4E1F");

    third?.style.setProperty("text-decoration-color", "#34D399");
    c?.style.setProperty("border", "solid 2px #34D399");
    c?.style.setProperty("background", "#2F4F38");

    fourth?.style.setProperty("text-decoration-color", "#A78BFA");
    d?.style.setProperty("border", "solid 2px #A78BFA");
    d?.style.setProperty("background", "#3F2F50");

    currentPage?.style.setProperty("color", "#F2F2F2");
    aCurrentPage?.style.setProperty("color", "#F2F2F2");
    bCurrentPage?.style.setProperty("color", "#F2F2F2");

    calendarCont?.style?.setProperty("background", "#2A2A2C");  
    calendarCont?.style?.setProperty("border", "1px solid #374151");

    DateNames.forEach(dates => {
        dates?.style?.setProperty("color", "#F2F2F2");
    });

    cells.forEach(cell => {
        if (cell.classList.contains("day")) {
            cell.style.background = "#1C1C1E";
            cell.style.border = "1px solid #000000";
            cell.style.color = "#000000";
        } else if (cell.classList.contains("xday")) {
            cell.style.background = "#B388FF";
            cell.style.border = "none";
        } else if (cell.classList.contains("notday")) {
            cell.style.background = "#37373a";
            cell.style.border = "1px solid #000000";
            cell.style.color = "#9CA3AF";
        }
    });

    allDivs.forEach(div => {
        div?.style?.setProperty("color", "#ffffff");
    });

    allPara.forEach(p => {
        p?.style?.setProperty("color", "#ffffff");
    });

    alltasks.forEach(p => {
        p?.style?.setProperty("background-color", "rgba(255, 255, 255, 0.1)");
    });

    taskCard.forEach(card => {
        card?.style?.setProperty("background", "#232323"); 
    });

    inputs.forEach(input => {
        input?.style?.setProperty("background", "#333"); 
        input?.style?.setProperty("color", "#F2F2F2"); 
    });

    edits.forEach(input => {
        input?.style?.setProperty("background", "#333"); 
        input?.style?.setProperty("color", "#F2F2F2"); 
    });
  }
};

mode.addEventListener("click", () => { 
    flag = !flag; 
    display(); 
});

display();
