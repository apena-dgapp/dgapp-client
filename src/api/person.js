export const getOnePerson = async (token, id) => {
    const body = {id};
    return fetch(`${process.env.REACT_APP_API}person/getoneperson`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

// export const getOnePerson = async (token, id) => {
//         const body = {token, id};
//         return fetch("http://172.17.70.118:4500/api/v1/person/getoneperson", {
//             method: "POST",
//              body: JSON.stringify(body),
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: 'Bearer ' + token,
//             }   
//         })
//     }
    