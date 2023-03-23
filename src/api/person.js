export const getOnePerson = async (id) => {
    const body = { id };
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

export const getDirectory = async (page,limit,related, departamentList, departament) => {
    const body = { page,limit,related,departamentList, departament }
    return fetch(`${process.env.REACT_APP_API}person/getdirectory`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getPersonIt = async () => {
    return fetch(`${process.env.REACT_APP_API}person/getpersonit`, {
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

export const createPerson = async (code, firstname, lastname, documentid, phone, cel, email, departament, createdby, modifiedby, photo, date,gender, position, isactive, career, reportto, startedon, health, blood, emergencyname, emergencynumber, emergencyrelationship, contracttype, contractexpiration) => {
    const body = { code, firstname, lastname, documentid, phone, cel, email, departament, createdby, modifiedby, photo, date,gender, position, isactive, career, reportto, startedon, health, blood, emergencyname, emergencynumber, emergencyrelationship, contracttype, contractexpiration };
    return fetch(`${process.env.REACT_APP_API}person/createperson`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const updatePerson = async (id, photo, firstname, lastname, documentid, cel, date, career, code, position, departament, reportto, startedon, phone, email, health, modifiedby, modifiedat, blood, emergencyname, emergencynumber, emergencyrelationship, contracttype, contractexpiration, gender) => {
    const body = { id, photo, firstname, lastname, documentid, cel, date, career, code, position, departament, reportto, startedon, phone, email, health, modifiedby, modifiedat, blood, emergencyname, emergencynumber, emergencyrelationship, contracttype, contractexpiration, gender };
    return fetch(`${process.env.REACT_APP_API}person/updateperson`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const isActivePerson = async (id, bool, modifiedby, modifiedat) => {
    const body = { id, bool, modifiedby, modifiedat };
    return fetch(`${process.env.REACT_APP_API}person/isactiveperson`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const isVacationPerson = async (id, bool, modifiedby, modifiedat) => {
    const body = { id, bool, modifiedby, modifiedat };
    return fetch(`${process.env.REACT_APP_API}person/isvacationperson`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getLastCode = async () => {
    return fetch(`${process.env.REACT_APP_API}person/lastcode`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const validationEmail = async (email) => {
    const body = { email }
    return fetch(`${process.env.REACT_APP_API}person/validationemail`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const validationDocument = async (documentid) => {
    const body = { documentid }
    return fetch(`${process.env.REACT_APP_API}person/validationdocumentid`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getPhotos = async (id) => {
    const body = { id }
    return fetch(`${process.env.REACT_APP_API}person/getphotos`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}


