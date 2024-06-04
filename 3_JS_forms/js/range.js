var slide = document.getElementById("range")
var y = document.getElementById("range-value")

y.innerHTML = slide.value;

slide.oninput = function () {
    y.innerHTML = this.value;
}