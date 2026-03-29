import {fetchSignedIn, fetchText, fetchUsername} from "./utils.js";

// (probably) navbar is anywhere, so parent is defined
const parent = document.getElementById("navbar-global-container");
const isSignedIn = await fetchSignedIn();

if (isSignedIn) {
    const username = await fetchUsername()
    const navbarText = await fetchText("/common/_navbar-user.html");

    parent.innerHTML = navbarText.replaceAll("{USERNAME}", username);
    const signOutButton = document.getElementById("sign-out-button")

    async function signOut() {
        const signInResponse = await fetch("/api/sign-out", {method: "POST"});
        if (signInResponse.ok) {
            window.location.href = "/index";
        } else {
            alert("Something went wrong.");
        }
    }

    signOutButton.addEventListener("click", signOut)
} else {
    const navbarText = await fetchText("/common/_navbar-guest.html")
    parent.innerHTML = navbarText;
}


const listItems = parent.firstElementChild.firstElementChild.children
for (let item of listItems) {
    if (item.firstElementChild.href === window.location.href) {
        item.style.fontWeight = "bold";
    }
}
