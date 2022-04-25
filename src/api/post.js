
const newPostApi = async (token,title,description,category,author,image,views,isactive,createdby,modifiedby) => {
    const body = {title,description,category,author,image,views,isactive,createdby,modifiedby};
    return fetch(`${process.env.REACT_APP_API}post/newpost`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

const getPost = async (token,category) => {
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

const getview = async (token) => {
    return fetch(`${process.env.REACT_APP_API}post/getview`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}

const viewUpdate = async (token,click) => {
    const body = {click};
    return fetch(`${process.env.REACT_APP_API}post/view`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token,
        }   
    })
}


module.exports = {
    newPostApi,
    getPost,
    viewUpdate,
    getview
};