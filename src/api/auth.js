export const apiAuth = async (username, password) => {
    const body = {username, password};
    return fetch(`${process.env.REACT_APP_API}auth/signin`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
}

export const singUp = async (personId,userName, password,createdBy,roleId) => {
    const body = {personId,userName, password,createdBy,roleId};
    return fetch(`${process.env.REACT_APP_API}auth/signup`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
}

