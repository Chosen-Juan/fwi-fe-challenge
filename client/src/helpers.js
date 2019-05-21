export const compress = file => {
  const width = 500;
  const height = 300;
  const fileName = file.name;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob(blob => {
          const compressedFile = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          resolve(compressedFile);
        }, 'image/jpeg', 1);
      }
    };
    reader.onerror = error => reject(error);
  });
}