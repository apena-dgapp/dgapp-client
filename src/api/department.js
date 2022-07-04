export const getAlldepartament = async () => {
    return fetch(`${process.env.REACT_APP_API}departament/departaments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}