export const getCourses = async () => {
    return fetch(`${process.env.REACT_APP_API}course/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

