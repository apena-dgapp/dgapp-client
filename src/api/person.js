export const getOnePerson = async (id) => {
    const body = {id};
    return fetch(`${process.env.REACT_APP_API}person/getoneperson`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

export const getAllPersons = async () => {
    return fetch(`${process.env.REACT_APP_API}person/getallpersons`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

export const getEmployeeTree = async () => {
    return fetch(`${process.env.REACT_APP_API}person/employeetree`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

export const getBirthday = async () => {
    return fetch(`${process.env.REACT_APP_API}person/getallbirthday`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

export const getFollowers = async (id) => {
    const body = {id};
    return fetch(`${process.env.REACT_APP_API}person/getfollowers`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}   

export const createPerson = async (code, firstname,lastname,documentid,phone, cel,email,departament,createdby,modifiedby,photo,date, position,isactive,career,reportto,startedon,health) => {
    const body = {code,firstname,lastname,documentid,phone, cel,email,departament,createdby,modifiedby,photo,date,position,isactive,career,reportto,startedon,health};
    return fetch(`${process.env.REACT_APP_API}person/createperson`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

export const updatePerson = async (id,photo,firstname,lastname,documentid, cel,date, career, code, position, departament,reportto, startedon, phone, email, health) => {
    const body = {id,photo,firstname,lastname,documentid, cel,date, career, code, position, departament,reportto, startedon, phone, email, health};
    return fetch(`${process.env.REACT_APP_API}person/updateperson`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}


//build

// export const getOnePerson = async (token, id) => {
//     const body = {id};
//     return fetch("http://172.17.70.118:4500/api/v1/person/getoneperson", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const getAllPersons = async (token) => {
//     return fetch("http://172.17.70.118:4500/api/v1/person/getallpersons", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const getEmployeeTree = async (token) => {
//     return fetch(("http://172.17.70.118:4500/api/v1/person/employeetree", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const getBirthday = async (token) => {
//     return fetch("http://172.17.70.118:4500/api/v1/person/getallbirthday", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const getFollowers = async (token, id) => {
//     const body = {id};
//     return fetch("http://172.17.70.118:4500/api/v1/person/getfollowers", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }   