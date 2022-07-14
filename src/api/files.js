export const apiFiles = async (category) => {
    const body = {category};
    return fetch(`${process.env.REACT_APP_API}files/getfiles`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

