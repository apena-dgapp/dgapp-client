const blobToBase64 = (blob) =>{
    return new Promise((resolve, reject) =>{
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
        resolve(reader.result);
        }
    })
}

// const blobToBase64 = (blob) =>{
//     return new Promise((resolve, reject) =>{

//         Array.from(blob).forEach(e =>{
//             const reader = new FileReader();
//             reader.readAsDataURL(e);
//             reader.onload = () => {
//             resolve(reader.result);
//             console.log(resolve[0])
//             }
//         })
//     })
// }


// const blobToBase64 = (blob) =>{
//     Array.from(blob).forEach(e =>{
//         var reader = new FileReader();
//         reader.readAsDataURL(e);
//         reader.onload = function(){
//             var b64 = reader.result;
//             console.log(b64);
//         }
//     })
// }

const base64ToBlob = async (b64, type) => {
    const blob = await fetch(`data:${type};base64,${b64}`);
    return blob;
}

module.exports ={
    blobToBase64,
    base64ToBlob
};