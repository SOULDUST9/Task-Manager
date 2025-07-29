const thisWeekList = document.getElementById("1-task-list");
const nextWeekList = document.getElementById("2-task-list");
const upcomingList = document.getElementById("3-task-list");

function showTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    thisWeekList.innerHTML = "";
    nextWeekList.innerHTML = "";
    upcomingList.innerHTML = "";

    const today = new Date();
    const endOfThisWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const daysUntilSunday = 7 - dayOfWeek;
    endOfThisWeek.setDate(today.getDate() + daysUntilSunday);

    const endOfNextWeek = new Date(endOfThisWeek);
    endOfNextWeek.setDate(endOfThisWeek.getDate() + 7);

    tasks.forEach((task, index) => {
        const due = new Date(task.dueDate);

        const card = document.createElement("div");
        card.classList.add("task-card", "readonly");

        card.innerHTML = `
            <p><strong>Task:</strong> ${task.task}</p>
            <p><strong>Category:</strong> ${task.category}</p>
            <p><strong>Start Date:</strong> ${task.startDate}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <button class="complete-btn" data-index="${index}">Complete</button>
        `;

        if (due < endOfThisWeek) {
            thisWeekList.appendChild(card);
        } else if (due < endOfNextWeek) {
            nextWeekList.appendChild(card);
        } else {
            upcomingList.appendChild(card);
        }
    });
}

showTasks();
