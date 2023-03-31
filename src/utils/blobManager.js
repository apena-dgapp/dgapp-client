export const blobToBase64 = async (files) => {
    const promises = []
    Array.from(files).forEach(file => promises.push(getBase64(file)))
    return await Promise.all(promises)
}

export const getBase64 = (file) => {
    const reader = new FileReader();
    return new Promise(resolve => {
        reader.onload = base64 => {
            resolve(base64.target.result)
        }

        if (file) {
            reader.readAsDataURL(file);
        }

    })
}

// export const base64ToBlob = async (b64, type) => {
//     const blob = await fetch(`data:${type};base64,${b64}`);
//     return blob;
// }

