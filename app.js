
const thisWeeksTasks = document.getElementById("this-weeks-tasks");
const NextWeeksTasks = document.getElementById("next-weeks-tasks");
const followingWeeksTasks = document.getElementById("upcoming-tasks");

const today = new Date().toISOString().split("T")[0];

function showTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    thisWeeksTasks.innerHTML = "";
    NextWeeksTasks.innerHTML = "";
    followingWeeksTasks.innerHTML = "";


    let daysTillNextWeek = 7 - today.getDay();
    if (tasks.length === 0) {
        NoElems.style.display = "block";
        return;
    } else {
        NoElems.style.display = "none";
    }

    tasks.forEach((task, index) => {
        const card = document.createElement("div");
        card.classList.add("task-card readonly");

        card.innerHTML = `
            <p><strong>Task:</strong> ${task.task}</p>
            <p><strong>Category:</strong> ${task.category}</p>
            <p><strong>Start Date:</strong> ${task.startDate}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <button class="complete-btn" data-index="${index}">Complete</button>
        `;

        thisWeeksTasks.appendChild(card);

    });
}

clearButton.addEventListener("click", function(){
    localStorage.clear();
    showTasks();
    
});


showTasks();
