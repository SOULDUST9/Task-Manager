const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");

let currentTime = new Date();

let todaysDay = currentTime.getDate();
let todaysMonth = currentTime.getMonth();
let todaysYear = currentTime.getFullYear();

let currentMonth = currentTime.getMonth();
let currentYear = currentTime.getFullYear();

const daysContainer = document.querySelector(".calendar-days"); 

const daysInMonth = 0;

const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const showMonth = () => {
    const Month = document.querySelector(".month");
    const Year = document.querySelector(".year");

    Month.textContent = Months[currentMonth];
    Year.textContent = currentYear;

    loadDays();

}

const checkDay = (day) => {
    if (todaysMonth == currentMonth && todaysYear == currentYear && todaysDay == day){
        return true;
    }else{ 
        return false;
    }
}

const loadDays = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    daysContainer.innerHTML = "";

    for(let i = 1; i <= daysInMonth; i++){
        const card = document.createElement("div");
        if (checkDay(i)){
            card.classList.add("xday");
        }else {
            card.classList.add("day");
        }
        card.innerHTML = `
            <p>${i}</p>
        `;

        tasks.forEach((task, index) => {
            const dueDate = new Date(task.dueDate);
            dueDate.setDate(dueDate.getDate() + 1);
            if (dueDate.getMonth() === currentMonth && dueDate.getDate() === i && dueDate.getFullYear() === currentYear){
                card.innerHTML += `<p>${task.category}: ${task.task}</p>`;
            } 
        });

        daysContainer.appendChild(card);
    }
}

prevMonth.addEventListener("click", function(){

    const Month = document.querySelector(".month");
    const Year = document.querySelector(".year");

    if (currentMonth == 0){
        currentMonth = 11;
        currentYear--;

    }else{ 
        currentMonth--;
    }

    showMonth();
});

nextMonth.addEventListener("click", function(){

    const Month = document.querySelector(".month");
    const Year = document.querySelector(".year");

    if (currentMonth == 11){
        currentMonth = 0;
        currentYear++;

    }else{ 
        currentMonth++;
    }
    
    showMonth();
});


showMonth();
loadDays();