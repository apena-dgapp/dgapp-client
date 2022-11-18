export const newTicket = async (emailUser, issueName, departament, issueStart, detail, priority, createdBy) => {
    const body = { emailUser, issueName, departament, issueStart, detail, priority, createdBy };
    return fetch(`${process.env.REACT_APP_API}ticket/new`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getTickesAll = async (departament) => {
    const body = { departament };
    return fetch(`${process.env.REACT_APP_API}ticket/getall`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getTickes = async (status, departament) => {
    const body = { status, departament };
    return fetch(`${process.env.REACT_APP_API}ticket/getstatus`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const toAssign = async (assigned, id) => {
    const body = { assigned, id };
    return fetch(`${process.env.REACT_APP_API}ticket/toassign`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const remove = async (status, id) => {
    const body = { status, id };
    return fetch(`${process.env.REACT_APP_API}ticket/remove`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}