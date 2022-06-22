export const apiFiles = async (token, category) => {
    const body = {category};
    return fetch(`${process.env.REACT_APP_API}files/getfiles`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}


//build
// export const apiFiles = async (token, category) => {
//     const body = {category};
//     return fetch("http://172.17.70.118:4500/api/v1/files/getfiles", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }
