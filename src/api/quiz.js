export const newQuiz = async ( question, answer1, answer2, answer3, answer4, createdBy,initial, expiration ) => {
    const body = { question, answer1, answer2, answer3, answer4, createdBy,initial, expiration };
    return fetch(`${process.env.REACT_APP_API}quiz/new`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getQuiz = async () => {
    return fetch(`${process.env.REACT_APP_API}quiz/current`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const sendAnswer = async ( quizId, personId, selected) => {
    const body = { quizId, personId, selected };
    return fetch(`${process.env.REACT_APP_API}quiz/sendanswer`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const expirationQuiz = async () => {
    return fetch(`${process.env.REACT_APP_API}quiz/expiration`, {
        method: "PUT",
        body: JSON.stringify(),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}