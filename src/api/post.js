
export const newPostApi = async (token, title, description, category, author, image, views, isactive, createdby, modifiedby) => {
    const body = {title, description, category, author, image, views, isactive, createdby, modifiedby};
    return fetch("http://172.17.70.118:4500/api/v1/post/newpost", {
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
    return fetch("http://172.17.70.118:4500/api/v1/post/featuredposts", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

export const allPostApi = async (token) => {
    return fetch("http://172.17.70.118:4500/api/v1/post/allpost", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

export const interestPost = async (token) => {
    return fetch("http://172.17.70.118:4500/api/v1/post/interest", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

export const viewUpdate = async (token, id) => {
    const body = {id};
    return fetch("http://172.17.70.118:4500/api/v1/post/updateview", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

