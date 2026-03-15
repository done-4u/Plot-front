// trick: there is navbar.html in user directory as well as guest directory
fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar-container").innerHTML = data;
    })