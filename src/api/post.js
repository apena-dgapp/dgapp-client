
export const newPostApi = async (token, title, description, category, author, image, views, isactive, createdby, modifiedby) => {
    const body = {title, description, category, author, image, views, isactive, createdby, modifiedby};
    return fetch(`${process.env.REACT_APP_API}post/newpost`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

export const getPost = async (token, category) => {
    const body = {category};
    return fetch(`${process.env.REACT_APP_API}post/featuredposts`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

export const allPostApi = async (token) => {
    return fetch(`${process.env.REACT_APP_API}post/allpost`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

export const interestPost = async (token) => {
    return fetch(`${process.env.REACT_APP_API}post/interest`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

export const viewUpdate = async (token, id) => {
    const body = {id};
    return fetch(`${process.env.REACT_APP_API}post/updateview`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

