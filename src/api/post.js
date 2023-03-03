export const newPostApi = async (title, description, category, author, image, views, isactive, createdby, createdat,expiration,tags,link) => {
    const body = { title, description, category, author, image, views, isactive, createdby, createdat,expiration,tags,link };
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

export const getMultimedia = async (category, limit, type) => {
    const body = { category, limit,type };
    return fetch(`${process.env.REACT_APP_API}post/multimediafiles`, {
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

export const createFile = async (postid, name, type, file, size, caption) => {
    const body = { postid, name, type, file, size, caption };
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
    return fetch(`${process.env.REACT_APP_API}filespost/getfilespost`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getFilesId = async (postid) => {
    const body = { postid };
    return fetch(`${process.env.REACT_APP_API}filespost/getfilesid`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const srcFiles = async (id) => {
    const body = { id };
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

export const deleteComment = async (id) => {
    const body = { id };
    return fetch(`${process.env.REACT_APP_API}post/deletecomment`, {
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

export const updatePost = async (id, title, description, author, image, date, tags) => {
    const body = { id, title, description, author, image, date, tags };
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

export const validationNotices = async (initial) => {
    const body = { initial };
    return fetch(`${process.env.REACT_APP_API}post/validationnoticies`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const expirationNoticies = async () => {
    return fetch(`${process.env.REACT_APP_API}post/expirationnoticies`, {
        method: "PUT",
        body: JSON.stringify(),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const expirationPost = async (category, table) => {
    const body ={category, table};
    return fetch(`${process.env.REACT_APP_API}post/expirationpost`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const giveLike = async (postId, personId, action) => {
    const body = { postId, personId,action };
    return fetch(`${process.env.REACT_APP_API}like/givelike`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}
export const countLike = async ( postId, action ) => {
    const body = { postId, action };
    return fetch(`${process.env.REACT_APP_API}like/likes`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getGallery = async (page, limit, related, type) => {
    const body = { page, limit, related,type };
    return fetch(`${process.env.REACT_APP_API}post/getgallery`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const imagesCount = async (postid) => {
    const body = { postid };
    return fetch(`${process.env.REACT_APP_API}filespost/count`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}
