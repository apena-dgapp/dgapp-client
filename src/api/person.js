const getOnePerson = async (token,email) => {
    const body = {token,email};
    return fetch("http://localhost:4500/api/v1/person/getoneperson", {
        method: "POST",
         body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

module.exports = {
    getOnePerson
};