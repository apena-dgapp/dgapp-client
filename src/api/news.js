export const getNews = async (page, limit) => {
    const body = { page, limit };
    return fetch(`${process.env.REACT_APP_API}news/all`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}
export const getOtherNews = async () => {
    return fetch(`${process.env.REACT_APP_API}news/other`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}
