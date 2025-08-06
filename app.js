const pastWeeksList = document.getElementById("0-task-list");
const thisWeekList = document.getElementById("1-task-list");
const nextWeekList = document.getElementById("2-task-list");
const upcomingList = document.getElementById("3-task-list");

function showTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    thisWeekList.innerHTML = "";
    nextWeekList.innerHTML = "";
    upcomingList.innerHTML = "";
    pastWeeksList.innerHTML = "";

    const today = new Date();
    today.setDate(today.getDate() - 1);
    const endOfThisWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const daysUntilSunday = 7 - dayOfWeek;
    endOfThisWeek.setDate(today.getDate() + daysUntilSunday);

    const endOfNextWeek = new Date(endOfThisWeek);
    endOfNextWeek.setDate(endOfThisWeek.getDate() + 7);

    tasks.forEach((task, index) => {
        const due = new Date(task.dueDate);

        const card = document.createElement("li");

        card.innerHTML = `
            <p><strong>Category:</strong> ${task.category}</p>
            <p><strong>Task:</strong> ${task.task}</p>
            <p><strong>Start Date:</strong> ${task.startDate}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <button class="complete-btn" data-index="${index}">Complete</button>
        `;

        if (due < today) {
            pastWeeksList.appendChild(card);
        } 
        else if (due <= endOfThisWeek) {
            thisWeekList.appendChild(card);
        } 
        else if (due <= endOfNextWeek) {
            nextWeekList.appendChild(card);
        } 
        else {
            upcomingList.appendChild(card);
        }

        const completebtn = card.querySelector(".complete-btn");
        completebtn.addEventListener("click", function(){
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            alert("Congradulations, Task completed!");
            showTasks();
        });
    });

    if (pastWeeksList.innerHTML == "") {
        appendEmptyMessage(pastWeeksList);
    }
    
    if (thisWeekList.innerHTML == "") {
        appendEmptyMessage(thisWeekList);
    }
    
    if (nextWeekList.innerHTML == "") {
        appendEmptyMessage(nextWeekList);
    }
    
    if (upcomingList.innerHTML == "") {
        appendEmptyMessage(upcomingList);
    }
}

const appendEmptyMessage = (container) => {
    const emptyCard = document.createElement("li");
    emptyCard.innerHTML = `<p>No Task Found.</p>`;
    container.appendChild(emptyCard);
}

showTasks();
