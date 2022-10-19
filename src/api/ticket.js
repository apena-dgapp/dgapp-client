export const newTicket = async (personId, issueName, departament, issueStart, detail, priority, createdBy) => {
    const body = { personId, issueName, departament, issueStart, detail, priority, createdBy };
    return fetch(`${process.env.REACT_APP_API}ticket/new`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}