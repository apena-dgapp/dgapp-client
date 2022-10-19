export const getTweets = async () => {
    return fetch(`${process.env.REACT_APP_API}/twitter/tweets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

