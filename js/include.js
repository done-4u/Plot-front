// navbar is in all pages
fetch("is-signed-in", {credentials: "include", headers: {"Accept": "application/json"}})
    .then(response => response.json())
    .then(data => fetch(data.isSignedIn ? "navbar-user.html" : "navbar-guest.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        }))

// some pages do not contain footer
const footer_container = document.getElementById("footer-container")
if (footer_container) {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footer_container.innerHTML = data;
        });
}