fetch("is-signed-in", {credentials: "include"})
    .then(response => response.json())
    .then(data => data.isSignedIn)
    .then(isSignedIn => {
        fetch(isSignedIn ? "navbar-user.html" : "navbar-guest.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("navbar-container").innerHTML = data;
            });
    })

fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer-container").innerHTML = data;
    });