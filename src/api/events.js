
export const newEvents = async (name, description, room, color, from, to, starttime, endingtime, createdby) => {
    const body = { name, description, room, color, from, to, starttime, endingtime, createdby };
    return fetch(`${process.env.REACT_APP_API}events/newevent`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getEvents = async () => {
    return fetch(`${process.env.REACT_APP_API}events/getevents`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

