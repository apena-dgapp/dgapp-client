export function getVideoId(url) {
    try {
      const videoUrlType_1 = url.includes("youtube")
      const videoUrlType_2 = url.includes("youtu.be")
      if (videoUrlType_1) {
        const id = url?.split("v=")[1]?.split("&");
        return id[0];
      }
      else if (videoUrlType_2) {
        const id = url?.split('.be/')[1]
        return id;
      }
    } catch (error) {
      console.error("Link invalido");
    }
  }


