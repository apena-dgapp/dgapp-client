export const newTicket = async (emailUser, issueName, departament, category, detail, priority, createdBy) => {
    const body = { emailUser, issueName, departament, category, detail, priority, createdBy };
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
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const apiTicketUpdate = async (id, action, value) => {
    const body = { id, action, value };
    return fetch(`${process.env.REACT_APP_API}ticket/update`, {
        method: "PUT",
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
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}