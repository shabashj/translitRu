document.body.style.border = "5px solid red";

document.addEventListener("keydown", function (event) {
    var key = event.keyCode === 113;
    var shift = event.shiftKey;

    if (shift && key) {
        alert("Translit!");
    }
});