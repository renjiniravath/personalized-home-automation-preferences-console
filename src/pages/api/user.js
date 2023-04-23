import handler from "./handler"

export const checkIfUserIsAuthorized = (username) => {
    const url = `users/${username}/check`
    return handler("GET", url)
}