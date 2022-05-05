// export const getOnePerson = async (token,email) => {
//     const body = {token,email};
//     return fetch(`${process.env.REACT_APP_API}person/getoneperson`, {
//         method: "POST",
//          body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

export const getOnePerson = async (token,email) => {
        const body = {token,email};
        return fetch("http://172.17.70.118:4500/api/v1/person/getoneperson", {
            method: "POST",
             body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token,
            }   
        })
    }
    