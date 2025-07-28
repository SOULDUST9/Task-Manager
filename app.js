const StartDate = document.getElementById("start-date");
const EndDate = document.getElementById("due-date");

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