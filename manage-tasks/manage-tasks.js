const Category = document.getElementById("category");
const Task = document.getElementById("task-name");
const StartDate = document.getElementById("start-date");
const EndDate = document.getElementById("due-date");

const Add = document.getElementById("add-btn");

const today = new Date().toISOString().split("T")[0];

StartDate.min = today;
EndDate.min = today;
StartDate.value = today;
EndDate.value = today;

StartDate.addEventListener("change", function() {
    EndDate.min = StartDate.value;
    if (EndDate.value < StartDate.value){
        EndDate.value = StartDate.value;
    }
    
});

Add.addEventListener("click", function() {
    const cat = Category.value;
    const task = Task.value;
    const Sdate = StartDate.value;
    const Edate = EndDate.value;

    if (cat == '' || task == '' ){
        alert("Please fill in ALL fields!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItems("tasks")) || [];
    Tasks = {
        category: cat,
        task: task,
        Sdate: Sdate,
        Edate: Edate
    };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    showTasks();

});

const showTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
}