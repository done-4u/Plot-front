const parent = document.getElementById("navbar-plot-container");
const navbarPath = "/common/_navbar-plot.html";
const segments = window.location.pathname.split("/");
const plotPath = segments.slice(1, 5).join("/");
fetch(navbarPath)
    .then(response => response.text())
    .then(data => {
        parent.innerHTML = data.replaceAll("{PLOT_PATH}", plotPath);
        const listItems = parent.firstElementChild.firstElementChild.children
        for (let item of listItems) {
            if (item.firstElementChild.href === window.location.href) {
                item.style.fontWeight = "bold";
            }
        }
    })
