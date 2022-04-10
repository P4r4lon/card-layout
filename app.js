const openButton = document.getElementById("open")

const closeButton = document.querySelector(".cross")

const container = document.querySelector(".container")


openButton.onclick = () => {
    container.style.display = "flex";
    openButton.style.display = "none";
    setTimeout(() => {
        container.style.opacity = 1;
    }, 0)

}

closeButton.onclick = () => {
    container.style.opacity = 0;
    openButton.style.display = "block";

    setTimeout(() => {
        container.style.display = "none";
    }, 500)
}