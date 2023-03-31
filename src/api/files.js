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

export const apiOneFile = async (name) => {
    const body = {name};
    return fetch(`${process.env.REACT_APP_API}files/getfile`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}

export const getResources = async (category, subCategory) => {
    const body = {category,subCategory};
    return fetch(`${process.env.REACT_APP_API}files/getresources`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }   
    })
}
