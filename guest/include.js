fetch("navbar-guest.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar-guest-container").innerHTML = data;
    })