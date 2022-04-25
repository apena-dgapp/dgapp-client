const blobToBase64 = (blob) =>{
    return new Promise((resolve, reject) =>{
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
        resolve(reader.result);

        }
    })
}

const base64ToBlob = async (b64, type) => {
    const blob = await fetch(`data:${type};base64,${b64}`);
    return blob;
}

module.exports ={
    blobToBase64,
    base64ToBlob
};