fetch("/api/signed-in-as")
    .then(response => response.json())
    .then(data => {
        // (probably) navbar is anywhere, so parent is defined
        const parent = document.getElementById("navbar-container");
        const username = data.username

        // API: the username is empty string("") if not signed in
        const navbarPath = username ? "/common/_navbar-user.html" : "/common/_navbar-guest.html";
        fetch(navbarPath)
            .then(response => response.text())
            .then(data => {
                parent.innerHTML = data;
                if (username) {
                    document.getElementById("plot-anchor").href = `/users/${username}/plots`
                    document.getElementById("profile-anchor").href = `/users/${username}`
                    document.getElementById("username-container").innerText = username
                }
            });
    })
