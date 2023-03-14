export const getAllPost = async () => {
    return fetch(`${process.env.REACT_APP_API}instagram/allposts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

export const getPostId = async (postId) => {
    const body = { postId };
    return fetch(`${process.env.REACT_APP_API}instagram/post/:postId'`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}