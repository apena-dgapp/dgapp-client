export const sendEmail = async (to, cc, subject, text, name, attach, step) => {
    const body = { to, cc, subject, text, name, attach, step };
    return fetch(`${process.env.REACT_APP_API}email/sendemail`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}
