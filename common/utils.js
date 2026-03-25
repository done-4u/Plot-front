export async function fetchJson(url) {
    const response = await fetch(url, {headers: {"accept": "application/json"}})
    return response.json()
}

export async function fetchJsonOfPathnameApi() {
    return fetchJson("/api" + window.location.pathname)
}
