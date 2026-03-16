function insert(input_file, parent_id) {
    const parent = document.getElementById(parent_id);
    if (parent) {
        fetch(input_file).then(response => response.text()).then(data => {
            const fragment = document.createRange().createContextualFragment(data)
            parent.appendChild(fragment)
        })
    }
}

const PAIRS = [// trick: there is navbar.html in user directory as well as guest directory
    ["navbar.html", "navbar-container"],

    ["../common/announcement-list-common.html", "announcement-list-container"]]

for (const pair of PAIRS) {
    insert(pair[0], pair[1])
}