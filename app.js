const pastWeeksList = document.getElementById("0-task-list");
const thisWeekList = document.getElementById("1-task-list");
const nextWeekList = document.getElementById("2-task-list");
const upcomingList = document.getElementById("3-task-list");

const days1 = document.getElementById("ThisWeeksDays");
const days2 = document.getElementById("NextWeeksDays");
const days3 = document.getElementById("UpcomingWeeksDays");

const Months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

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

    const todayx = new Date();

    days1.innerText =  days1.innerText + " (" + "Today" + " - " + Months[endOfThisWeek.getMonth()] + " " + endOfThisWeek.getDate() + ")";
    days2.innerText =  days2.innerText + " (" + Months[endOfThisWeek.getMonth()] + " " + endOfThisWeek.getDate() + " - " + Months[endOfNextWeek.getMonth()] + " " + endOfNextWeek.getDate() + ")";
    days3.innerText =  days3.innerText + " (After " + Months[endOfNextWeek.getMonth()] + " " + endOfNextWeek.getDate() + ")";

    tasks.forEach((task, index) => {
        const due = new Date(task.dueDate);
        
        let timeStart;
        let timeEnd;

        let startHour = parseInt(task.startDate.slice(11, 13)); 
        let startMinute = task.startDate.slice(14, 16);         
        let startSuffix = "AM";

        if (startHour === 0) {
            startHour = 12; 
        } else if (startHour === 12) {
            startSuffix = "PM"; 
        } else if (startHour > 12) {
            startHour -= 12;
            startSuffix = "PM";
        }

        timeStart = `${startHour}:${startMinute} ${startSuffix}`;

        let endHour = parseInt(task.dueDate.slice(11, 13));
        let endMinute = task.dueDate.slice(14, 16);
        let endSuffix = "AM";

        if (endHour === 0) {
            endHour = 12;
        } else if (endHour === 12) {
            endSuffix = "PM";
        } else if (endHour > 12) {
            endHour -= 12;
            endSuffix = "PM";
        }

        timeEnd = `${endHour}:${endMinute} ${endSuffix}`;


        const card = document.createElement("li");
        if (Months[Number(task.startDate[5] + task.startDate[6]) - 1] == Months[Number(task.dueDate[5] + task.dueDate[6]) - 1] 
            && task.startDate[8] + task.startDate[9] == task.dueDate[8] + task.dueDate[9] 
            && task.startDate[0] + task.startDate[1] + task.startDate[2] + task.startDate[3] 
            == task.dueDate[0] + task.dueDate[1] + task.dueDate[2] + task.dueDate[3]){

                card.innerHTML = `
                    <p><strong>${task.category}:</strong> ${task.task}</p>
                    <p>
                        ${Months[Number(task.startDate[5] + task.startDate[6]) - 1]} ${task.startDate[8] + task.startDate[9]} ${task.startDate[0] + task.startDate[1] + task.startDate[2] + task.startDate[3]}
                        
                    </p>
                    <p> ${timeStart} → ${timeEnd} </p>
                    <button class="complete-btn" data-index="${index}">Complete</button>
                `;
        }else {
            card.innerHTML = `
                <p><strong>${task.category}:</strong> ${task.task}</p>
                <p>
                    ${Months[Number(task.startDate[5] + task.startDate[6]) - 1]} ${task.startDate[8] + task.startDate[9]} ${task.startDate[0] + task.startDate[1] + task.startDate[2] + task.startDate[3]}, ${timeStart} 
                    → ${Months[Number(task.dueDate[5] + task.dueDate[6]) - 1]} ${task.dueDate[8] + task.dueDate[9]} ${task.dueDate[0] + task.dueDate[1] + task.dueDate[2] + task.dueDate[3]}, ${timeEnd}
                </p>
                <button class="complete-btn" data-index="${index}">Complete</button>
            `;
        }

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
    emptyCard.innerHTML = `<p>No tasks here! You're all caught up.</p>`;
    container.appendChild(emptyCard);
}

showTasks();
