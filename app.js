const StartDate = document.getElementById("start-date");
const EndDate = document.getElementById("due-date");

const today = new Date().toISOString().split("T")[0];

StartDate.min = today;
EndDate.min = today;
