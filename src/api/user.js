export const createUser = async (personid, username, password, createby, modifiedby) => {
    const body = { personid, username, password, createby, modifiedby };
    return fetch(`${process.env.REACT_APP_API}user/createuser`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const existUser = async (id) => {
    const body = { id };
    return fetch(`${process.env.REACT_APP_API}user/existuser`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const existUsername = async (username) => {
    const body = { username };
    return fetch(`${process.env.REACT_APP_API}user/existusername`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const passUpdate = async (id, password) => {
    const body = { id, password };
    return fetch(`${process.env.REACT_APP_API}user/passupdate`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}



