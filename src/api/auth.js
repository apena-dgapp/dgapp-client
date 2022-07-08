// export const apiAuth = async (username, password) => {
//     const body = {username, password};
//     return fetch(`${process.env.REACT_APP_API}auth/signin`, {
//         method: "POST",
//         headers:{"Content-Type": "application/json"},
//         body: JSON.stringify(body)
//     })
// }

//build
export const apiAuth = async (username, password) => {
    const body = {username, password};
    return fetch("http://172.17.70.118:4500/api/v1/auth/signin", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
}