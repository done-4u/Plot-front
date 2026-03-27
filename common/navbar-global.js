import {fetchText, fetchUsername} from "./utils.js";

const usernameJson = await fetchUsername()
const username = usernameJson

// (probably) navbar is anywhere, so parent is defined
const parent = document.getElementById("navbar-global-container");
// API: the username is empty string("") if not signed in
const navbarPath = username ? "/common/_navbar-user.html" : "/common/_navbar-guest.html";

const navbarText = await fetchText(navbarPath);
parent.innerHTML = navbarText.replaceAll("{USERNAME}", username);
const listItems = parent.firstElementChild.firstElementChild.children
for (let item of listItems) {
    if (item.firstElementChild.href === window.location.href) {
        item.style.fontWeight = "bold";
    }
}
