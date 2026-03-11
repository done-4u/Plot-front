function getUsername() {
    // TODO
}

fetch("navbar-user.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar-user-container").innerHTML = data;
    })