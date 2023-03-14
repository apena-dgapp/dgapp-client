export const createVacation = async (personId, name, position, documentId, email, reportToId, reportToName, reportToEmail, departament, requirementDate, type, startedOn, totalTime, startDate, endDate, totalDaysRequested, signatureApplicant) => {
    const body = { personId, name, position, documentId, email, reportToId, reportToName, reportToEmail, departament, requirementDate, type, startedOn, totalTime, startDate, endDate, totalDaysRequested, signatureApplicant };
    return fetch(`${process.env.REACT_APP_API}form/createvacation`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const approveSupervisor = async (vacationId, requestStatus, requiresSubstitute, motivesSubstitute, signature) => {
    const body = { vacationId, requestStatus, requiresSubstitute, motivesSubstitute, signature };
    return fetch(`${process.env.REACT_APP_API}form/approvesupervisor`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const revisionRRHH = async (vacationId, rrhhFirstDaysAvailable, rrhhSecondDaysAvailable, rrhhFirstYearAvailable, rrhhSecondYearAvailable, rrhhTotalDaysAvailable, rrhhTotalDaysPending, rrhhName) => {
    const body = { vacationId, rrhhFirstDaysAvailable, rrhhSecondDaysAvailable, rrhhFirstYearAvailable, rrhhSecondYearAvailable, rrhhTotalDaysAvailable, rrhhTotalDaysPending, rrhhName };
    return fetch(`${process.env.REACT_APP_API}form/closevacation`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const apiApproveRRHH = async (vacationId, signatureRRHH, blobPdf) => {
    const body = {vacationId, signatureRRHH, blobPdf};
    return fetch(`${process.env.REACT_APP_API}form/approverrhh`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const getFormVacation = async (id) => {
    const body = { id };
    return fetch(`${process.env.REACT_APP_API}form/getvacation`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const saveSignature = async (id, table, column, signature) => {
    const body = { id, table, column, signature };
    return fetch(`${process.env.REACT_APP_API}form/savesignature`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

//LICENSE
export const getFormLicense = async (id) => {
    const body = { id };
    return fetch(`${process.env.REACT_APP_API}form/getlicense`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}
