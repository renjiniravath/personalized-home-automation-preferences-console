import handler from "./handler"

export const getIndividualPreferences = (username) => {
    const url = `users/${username}/preferences`
    return handler("GET", url)
}

export const updateIndividualPreferences = (username, body) => {
    const url = `users/${username}/preferences`
    return handler("PUT", url, body)
}

export const getSharedPreferences = (username) => {
    const url = `users/${username}/preferences/shared`
    return handler("GET", url)
}

export const requestSharedPreferences = (usernames, body) => {
    const url  = `users/${usernames}/requests`
    return handler("POST", url, body)
}

export const getPreferenceRequests = (username) => {
    const url = `users/${username}/requests`
    return handler("GET", url)
}

export const acceptPreferenceRequest = (usernames, body) => {
    const url = `users/${usernames}/requests/approve`
    return handler("PUT", url, body)
}