fetch("/api/signed-in-as")
    .then(response => response.json())
    .then(data => {
        // (probably) navbar is anywhere, so parent is defined
        const parent = document.getElementById("navbar-global-container");
        const username = data.username

        // API: the username is empty string("") if not signed in
        const navbarPath = username ? "/common/_navbar-user.html" : "/common/_navbar-guest.html";
        fetch(navbarPath)
            .then(response => response.text())
            .then(data => {
                parent.innerHTML = data.replaceAll("{USERNAME}", username);
                const listItems = parent.firstElementChild.firstElementChild.children
                for (let item of listItems) {
                    if (item.firstElementChild.href === window.location.href) {
                        item.style.fontWeight = "bold";
                    }
                }
            });
    })
