export async function fetchJson(url) {
    const response = await fetch(url, {headers: {"accept": "application/json"}})
    return response.json();
}

export async function fetchJsonOfPathnameApi() {
    return fetchJson("/api" + window.location.pathname);
}

export async function fetchText(url) {
    const response = await fetch(url);
    return response.text();
}

export async function fetchSignedIn() {
    const text = await fetchText("/api/is-signed-in");
    return text === "true";
}

export async function fetchUsername() {
    const usernameJson = await fetchJson("/api/signed-in-as");
    return usernameJson.username;
}

export function lowerHref(lower) {
    return window.location.pathname + "/" + lower;
}
