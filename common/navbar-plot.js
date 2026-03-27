import {fetchText} from "./utils.js";

const parent = document.getElementById("navbar-plot-container");
const navbarPath = "/common/_navbar-plot.html";
const segments = window.location.pathname.split("/");
const plotPath = segments.slice(1, 5).join("/");
const navbarText = await fetchText(navbarPath);

parent.innerHTML = navbarText.replaceAll("{PLOT_PATH}", plotPath);
const listItems = parent.firstElementChild.firstElementChild.children
for (let item of listItems) {
    if (item.firstElementChild.href === window.location.href) {
        item.style.fontWeight = "bold";
    }
}
