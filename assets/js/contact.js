document.querySelector("#submit").addEventListener("click", clickHandle);

function clickHandle() {
    alert("Form has been submitted!");
    window.location.href = "/";
}