fetch("/api/signed-in-as")
    .then(response => {
        response.json()
            .then(data => {
                // (probably) navbar is anywhere, so parent is defined
                const parent = document.getElementById("navbar-container");
                const username = data.username

                // API: the username is empty string("") if not signed in
                if (username) {
                    // caution: bare specifier
                    import("./navbar-user.js").then(response => {
                        parent.innerHTML = response.getNavbar(data.username)
                    })
                } else {
                    import("./navbar-guest.js").then(response => parent.innerHTML = response.template)
                }
            })
    })
