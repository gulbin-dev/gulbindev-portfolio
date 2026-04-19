export default function frameImages() {
  // this will be used as a fallback UI while the images are still loading
  // this will create an illution of image loader to prevent empty drawings on canvas
  const placeholderImage = new Image();
  placeholderImage.src = "/frame-image/profile-frame-1.webp";

  //  image frames
  const frameCount = 47;
  const imageURLS = new Array(frameCount)
    .fill(0)
    .map((_, i) => `/frame-image/profile-frame-${i + 1}.webp`);
  const playhead = { frame: 0 };
  const images: HTMLImageElement[] = [];

  return { placeholderImage, imageURLS, playhead, images };
}
