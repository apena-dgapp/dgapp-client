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
export const createLicense = async (personId, name, position, documentId, email, reportToId, reportToName, reportToEmail, departament, requirementDate, type,startHour,finalHour,totalHour, startDate, endDate, totalDaysRequested,justification,specificJustification,reason, signatureApplicant) => {
    const body = { personId, name, position, documentId, email, reportToId, reportToName, reportToEmail, departament, requirementDate, type,startHour,finalHour,totalHour, startDate, endDate, totalDaysRequested,justification,specificJustification,reason, signatureApplicant };
    // console.log(body);
    return fetch(`${process.env.REACT_APP_API}form/createlicense`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const approveSupervisorLicense = async (licenseId, requestStatus, signature) => {
    const body = { licenseId, requestStatus, signature };
    return fetch(`${process.env.REACT_APP_API}form/approvesupervisorlicense`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const revisionRRHHLicense = async (licenseId, generalRemarks, rrhhName) => {
    const body = { licenseId, generalRemarks, rrhhName };
    return fetch(`${process.env.REACT_APP_API}form/closelicense`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const apiApproveRRHHLicense = async (licenseId, signatureRRHH, blobPdf) => {
    const body = {licenseId, signatureRRHH, blobPdf};
    return fetch(`${process.env.REACT_APP_API}form/approverrhhlicense`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

//CARNET
export const getFormCarnet = async (id) => {
    const body = { id };
    return fetch(`${process.env.REACT_APP_API}form/getcarnet`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const createCarnet = async (personId, name, position, documentId,code,accessCard,pinID, email, reportToId, reportToName, reportToEmail, departament, requirementDate, type,specify,signatureApplicant) => {
    const body = {personId, name, position, documentId,code,accessCard,pinID, email, reportToId, reportToName, reportToEmail, departament, requirementDate, type,specify,signatureApplicant };
    return fetch(`${process.env.REACT_APP_API}form/createcarnet`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const revisionRRHHCarnet = async (carnetId, generalRemarks, rrhhName, deliveryDate) => {
    const body = { carnetId, generalRemarks, rrhhName,deliveryDate };
    return fetch(`${process.env.REACT_APP_API}form/revisionrrhh`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}

export const ApproveRRHHCarnet = async (carnetId, signatureRRHH, blobPdf, dateReceived) => {
    const body = {carnetId, signatureRRHH, blobPdf, dateReceived};
    return fetch(`${process.env.REACT_APP_API}form/approverrhhcarnet`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer',
        }
    })
}