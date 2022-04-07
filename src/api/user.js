
const createUser = async (token,personid,username,password,createby,modifiedby) => {
    const body = {personid,username,password,createby,modifiedby};
    return fetch("http://localhost:4500/api/v1/user/createuser", {
        method: "POST",
         body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

module.exports = {
    createUser
};