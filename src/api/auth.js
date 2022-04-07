const apiAuth = async (username, password) => {
    const body = {username, password};
    return fetch("http://localhost:4500/api/v1/auth/signin", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
}

module.exports = {
    apiAuth,
};