// frame images
const frameCount = 47;
const images = Array.from({ length: frameCount }, (_, i) => {
  const img = new Image();
  img.src = `/frame-image/profile-frame-${i + 1}.webp`;
  return img;
});
const playhead = { frame: 0 };

// this will be used as a fallback UI while the images are still loading
// this will create an illution of image loader to prevent empty drawings on canvas
const placeholderImage = new Image();
placeholderImage.src = "/frame-image/profile-frame-1.webp";
const eclipse = new Image();
eclipse.src = "/images/eclipse-bg.png";
export const frameImages = { placeholderImage, playhead, images, eclipse };
