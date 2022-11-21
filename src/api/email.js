export const sendEmail = async (to, subject, text) => {
    const body = { to, subject, text };
    return fetch(`${process.env.REACT_APP_API}email/sendemail`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}
