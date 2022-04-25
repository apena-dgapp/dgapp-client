const getOnePerson = async (token,email) => {
    const body = {token,email};
    return fetch(`${process.env.REACT_APP_API}person/getoneperson`, {
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