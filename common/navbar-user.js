export const getNavbar = username => `<nav id="navbar-user">
    <ul>
        <li><a href="/users/${username}/plots"><img alt="logo" src="">Plots</a></li>
        <li><a href="/users/${username}">Profile</a></li>
        <li>
            <form>
                <label for="search-user">Search</label>
                <input id="search-user" name="search" type="search" placeholder="..." required>
                    <button type="submit">Submit</button>
            </form>
        </li>
        <li><a href="/announcements">Announcements</a></li>
        <li>${username}</li>
        <li><a href="/settings">Settings</a></li>
        <li>
            <form action="/api/sign-out" method="post">
                <button type="submit">Sign out</button>
            </form>
        </li>
    </ul>
</nav>`