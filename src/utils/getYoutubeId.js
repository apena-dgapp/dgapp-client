export function getVideoId(url) {
    const id = url?.split('v=')[1]?.split('&')
    return id[0]
}