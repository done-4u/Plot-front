/**
 * Prefixes `url` with `"/api"`.
 * @param url{string}
 * @returns {string}
 */
export function prefixApi(url) {
    return "/api" + url;
}

/**
 * Fetches (GET) JSON of the given url (raw).
 * @param url{string}
 * @returns {Promise<any>}
 */
export async function fetchJson(url) {
    const response = await fetch(url, {headers: {"accept": "application/json"}})
    return response.json();
}

/**
 * Fetches (GET) JSON of the given url, after prefixing `"/api"`.
 * @param url{string}
 * @returns {Promise<any>}
 */
export async function fetchJsonApi(url) {
    return await fetchJson(prefixApi(url));
}

/**
 * Fetches (GET) JSON of the `window.location.pathname`, after prefixing `"/api"`.
 * @returns {Promise<any>}
 */
export async function fetchJsonOfPathnameApi() {
    return fetchJson(prefixApi(window.location.pathname));
}

/**
 * Fetches (GET) TEXT of the given url (raw).
 * @param url{string}
 * @returns {Promise<string>}
 */
export async function fetchText(url) {
    const response = await fetch(url);
    return response.text();
}

/**
 * Fetches (GET) and checks whether the client is signed in.
 * @returns {Promise<boolean>}
 */
export async function fetchSignedIn() {
    const text = await fetchText("/api/is-signed-in");
    return text === "true";
}

/**
 * Fetches (GET) username of the client.
 * @returns {Promise<string>}
 */
export async function fetchUsername() {
    const usernameJson = await fetchJson("/api/signed-in-as");
    return usernameJson.username;
}

/**
 * Fetches (POST) to the given url.
 * @param url{string}
 * @param body{any}
 * @returns {Promise<Response>}
 */
export async function fetchPostApi(url, body) {
    const init = {
        method: "POST", body: body
    };
    return await fetch(prefixApi(url), init);
}

/**
 * Fetches (POST) to `window.location.pathname`, after prefixing `"/api"`.
 * @param body{any}
 * @returns {Promise<Response>}
 */
export async function fetchPostToPathnameApi(body) {
    return await fetchPostApi(window.location.pathname, body);
}

/**
 * Fetches (PATCH) to the given url, after prefixing `"/api"` and converting body to JSON.
 * @param url{string}
 * @param body{any}
 * @returns {Promise<Response>}
 */
export async function fetchPatchJsonApi(url, body) {
    const init = {
        method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)
    };
    return await fetch(prefixApi(url), init);
}

/**
 * Fetches (DELETE) to the given url, after prefixing `"/api"`.
 * @param url
 * @returns {Promise<Response>}
 */
export async function fetchDeleteApi(url) {
    return await fetch(prefixApi(url), {method: "DELETE"});
}

/**
 * Returns upper url of current location pathname.
 * @returns {string}
 */
export function upperHref() {
    const parts = window.location.pathname.split("/")
    parts.pop();
    return parts.join("/");
}

/**
 * Returns lower url of current location pathname.
 * Automatically inserts or removes `/` between two chunks.
 * @param lower{string}
 * @returns {string}
 */
export function lowerHref(lower) {
    if (lower.startsWith("/")) {
        return window.location.pathname + lower;
    } else {
        return window.location.pathname + "/" + lower;
    }
}
