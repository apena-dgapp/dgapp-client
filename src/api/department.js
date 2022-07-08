// export const getAlldepartament = async () => {
//     return fetch(`${process.env.REACT_APP_API}departament/departaments`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer',
//         }   
//     })
// }

//built
export const getAlldepartament = async () => {
    return fetch("http://172.17.70.118:4500/api/v1/departament/departaments",  {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}