const imagesList = [];

export const removebg = imagesList.forEach((imageUrl) => {
    const image = new Image();
    image.onload = ({ target }) => {
        const w = Math.round(target.width);
        const h = Math.round(target.height);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const canvasContext = canvas.getContext("2d");
        canvasContext.drawImage(
            target,
            0,
            0,
            target.width,
            target.height,
            0,
            0,
            w,
            h
        );

        const canvasImageData = canvasContext.getImageData(0, 0, w, h);

        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
        //console.log(h* w * 4, canvasImageData.data.length);

        //     for (let index = 0; index <= h; index++) { // pixel por pixel
        //       const current = index * w * 4;
        //       let previous = current - w * 4;
        //           previous = previous < 0 ? 0 : previous;

        //       for(let indexPosition = previous; indexPosition < current; indexPosition+=4){
        //         const r = canvasImageData.data[indexPosition];
        //         const g = canvasImageData.data[indexPosition+1];
        //         const b = canvasImageData.data[indexPosition+2];
        //         if([r,g,b].every(item=>item > 210)) canvasImageData.data[indexPosition+3] = 0;
        //         else break; //remove apenas fundo, continuar codando
        //       }
        //       // console.log(current,  previous);
        //     }

        for (
            let index = 0, dataLength = canvasImageData.data.length;
            index < dataLength;
            index += 4
        ) {
            const r = canvasImageData.data[index];
            const g = canvasImageData.data[index + 1];
            const b = canvasImageData.data[index + 2];
            if ([r, g, b].every((item) => item > 230))
                canvasImageData.data[index + 3] = 0;
        }

        target.width = w;
        target.height = h;
        canvasContext.putImageData(canvasImageData, 0, 0);
        document.body.append(image, canvas);
    };
    image.crossOrigin = "";
    image.src = imageUrl;
});
