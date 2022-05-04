
export const createUser = async (token,personid,username,password,createby,modifiedby) => {
    const body = {personid,username,password,createby,modifiedby};
    return fetch(`${process.env.REACT_APP_API}user/createuser`, {
        method: "POST",
         body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

