
export const newPostApi = async (title, description, category, author, image, views, isactive, createdby, createdat) => {
    const body = { title, description, category, author, image, views, isactive, createdby, createdat };
    return fetch(`${process.env.REACT_APP_API}post/newpost`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getPost = async (category, limit) => {
    const body = { category, limit };
    return fetch(`${process.env.REACT_APP_API}post/getposts`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getPostMultimedia = async (category, limit) => {
    const body = { category, limit };
    return fetch(`${process.env.REACT_APP_API}post/multimediapost`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getPostMultimediaMain = async (category, limit) => {
    const body = { category, limit };
    return fetch(`${process.env.REACT_APP_API}post/multimediamain`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const allPostApi = async () => {
    return fetch(`${process.env.REACT_APP_API}post/allpost`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const interestPost = async () => {
    return fetch(`${process.env.REACT_APP_API}post/interest`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const viewUpdate = async (id) => {
    const body = { id };
    return fetch(`${process.env.REACT_APP_API}post/updateview`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const postId = async (title, category, author) => {
    const body = { title, category, author };
    return fetch(`${process.env.REACT_APP_API}post/postid`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const createFile = async (postid, name, type, file, size) => {
    const body = { postid, name, type, file, size };
    return fetch(`${process.env.REACT_APP_API}filespost/createfile`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getFiles = async (postid) => {
    const body = { postid };
    return fetch(`${process.env.REACT_APP_API}filespost/getfiles`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getVideo = async (postid) => {
    const body = { postid };
    return fetch(`${process.env.REACT_APP_API}filespost/getvideo`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const addCommentPost = async (postid, personid, text) => {
    const body = { postid, personid, text };
    return fetch(`${process.env.REACT_APP_API}post/addcomment`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}
export const getComments = async (postid) => {
    const body = { postid };
    return fetch(`${process.env.REACT_APP_API}post/getcomments`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getImage = async (id) => {
    const body = { id }
    return fetch(`${process.env.REACT_APP_API}post/getimage`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getDataCarousel = async (category, limit) => {
    const body = { category, limit };
    return fetch(`${process.env.REACT_APP_API}post/datacarousel`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const updatePost = async (id, title, description, author, image, date) => {
    const body = { id, title, description, author, image, date };
    return fetch(`${process.env.REACT_APP_API}post/updatepost`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const disabledPost = async (id) => {
    const body = { id };
    return fetch(`${process.env.REACT_APP_API}post/disabledpost`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}
