const Category = document.getElementById("category");
const Task = document.getElementById("task-name");
const StartDate = document.getElementById("start-date");
const EndDate = document.getElementById("due-date");

const Add = document.getElementById("add-btn");
const NoElems = document.getElementById("no-found-tasks");
const taskContainer = document.getElementById("task-list"); 
const clearButton = document.getElementById("clr-btn");

const today = new Date().toISOString().split("T")[0];

EndDate.min = today;
StartDate.value = today;
EndDate.value = today;

StartDate.addEventListener("change", function () {
    EndDate.min = StartDate.value;
    if (EndDate.value < StartDate.value) {
        EndDate.value = StartDate.value;
    }
});

Add.addEventListener("click", function () {
    const cat = Category.value.trim();
    const task = Task.value.trim();
    const Sdate = StartDate.value;
    const Edate = EndDate.value;

    if (cat === '' || task === '') {
        alert("Please fill in ALL fields!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
        category: cat,
        task: task,
        startDate: Sdate,
        dueDate: Edate
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    alert("Task Added!");

    showTasks();
});

function showTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    taskContainer.innerHTML = ""; 

    if (tasks.length === 0) {
        NoElems.style.display = "block";
        return;
    } else {
        NoElems.style.display = "none";
    }

    tasks.forEach((task, index) => {
        const card = document.createElement("div");
        card.classList.add("task-card");

        card.innerHTML = `
            <input type="text" class="edit-category" value="${task.category}">
            <input type="text" class="edit-name" value="${task.task}">
            <input type="date" class="edit-start-date" value="${task.startDate}">
            <input type="date" class="edit-due-date" value="${task.dueDate}">
            <button class="update-btn" data-index="${index}">Update</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        taskContainer.appendChild(card);

        const updatebtn = card.querySelector(".update-btn");
        updatebtn.addEventListener("click", function(){
            updatedTask = {
                category: card.querySelector(".edit-category").value,
                task: card.querySelector(".edit-name").value,
                startDate: card.querySelector(".edit-start-date").value,
                dueDate: card.querySelector(".edit-due-date").value
            };
            tasks[this.dataset.index] = updatedTask;
            localStorage.setItem("tasks", JSON.stringify(tasks));

            showTasks();
        });

        const removebtn = card.querySelector(".remove-btn");
        removebtn.addEventListener("click", function(){
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
        });
    });
}

clearButton.addEventListener("click", function(){
    localStorage.clear();
    showTasks();
    
});


showTasks();
