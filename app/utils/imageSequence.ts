// frame images
const frameCount = 47;
// TODO: update image to combine with eclipse shape and the profile image
const images = Array.from({ length: frameCount }, (_, i) => {
  const img = new Image();
  img.src = `/frame-image/frame-images_${i}.png`;
  return img;
});
const playhead = { frame: 0 };

// this will be used as a fallback UI while the images are still loading
// this will create an illution of image loader to prevent empty drawings on canvas
const placeholderImage = new Image();
placeholderImage.src = "/frame-image/frame-images_0.png";
export const frameImages = { placeholderImage, playhead, images };
