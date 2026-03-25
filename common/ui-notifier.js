const MESSAGES = {
    "sign-up-success": "Sign up success. Moving to sign in page."
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const message_key = urlParams.get('message');
    if (message_key in MESSAGES) {
        alert(MESSAGES[message_key])
    }

    // clearing URL
    window.history.replaceState({}, document.title, window.location.pathname);
});
