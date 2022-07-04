
export const newPostApi = async (title, description, category, author, image, views, isactive, createdby, modifiedby) => {
    const body = {title, description, category, author, image, views, isactive, createdby, modifiedby};
    return fetch(`${process.env.REACT_APP_API}post/newpost`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

export const getPost = async (category) => {
    const body = {category};
    return fetch(`${process.env.REACT_APP_API}post/featuredposts`, {
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
    const body = {id};
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
    const body = {title, category, author};
    return fetch(`${process.env.REACT_APP_API}post/postid`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

export const createFile = async (postid,name, type, file,size) => {
    const body = {postid,name, type, file,size};
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
    const body = {postid};
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
    const body = {postid};
    return fetch(`${process.env.REACT_APP_API}filespost/getvideo`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

//build

// export const newPostApi = async (token, title, description, category, author, image, views, isactive, createdby, modifiedby) => {
//     const body = {title, description, category, author, image, views, isactive, createdby, modifiedby};
//     return fetch("http://172.17.70.118:4500/api/v1/post/newpost", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const getPost = async (token, category) => {
//     const body = {category};
//     return fetch("http://172.17.70.118:4500/api/v1/post/featuredposts", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const allPostApi = async (token) => {
//     return fetch("http://172.17.70.118:4500/api/v1/post/allpost", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const interestPost = async (token) => {
//     return fetch("http://172.17.70.118:4500/api/v1/post/interest", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const viewUpdate = async (token, id) => {
//     const body = {id};
//     return fetch("http://172.17.70.118:4500/api/v1/post/updateview", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const postId = async (token, title, category, author) => {
//     const body = {title, category, author};
//     return fetch("http://172.17.70.118:4500/api/v1/post/postid", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const createFile = async (token, postid,name, type, file,size) => {
//     const body = {postid,name, type, file,size};
//     return fetch("http://172.17.70.118:4500/api/v1/filespost/createfile", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }

// export const getFiles = async (token, postid) => {
//     const body = {postid};
//     return fetch("http://172.17.70.118:4500/api/v1/filespost/getfiles", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }
// export const getVideo = async (token, postid) => {
//     const body = {postid};
//     return fetch("http://172.17.70.118:4500/api/v1/filespost/getvideo", {
//         method: "POST",
//         body: JSON.stringify(body),
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: 'Bearer ' + token,
//         }   
//     })
// }
