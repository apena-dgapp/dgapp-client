export const newTags = async (name, createdBy) => {
    const body = { name, createdBy };
    return fetch(`${process.env.REACT_APP_API}tags/new`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getTags = async () => {
    return fetch(`${process.env.REACT_APP_API}tags/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const incrementClick = async (name) => {
    const body = { name };
    return fetch(`${process.env.REACT_APP_API}tags/click`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const mostviewedTags = async () => {
    return fetch(`${process.env.REACT_APP_API}tags/mostviewed`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}
