interface ImageSequenceConfig {
  urls: string[];
  canvas: string | HTMLCanvasElement;
  scrollTrigger: gsap.plugins.ScrollTrigger["Vars"];
  onUpdate?: () => void;
}

export default function frameImages() {
  const placeholderImage = new Image();
  placeholderImage.src = `/frame-image/profile-frame-1.png`;

  // image frames
  const frameCount = 47;
  const imageURLS = new Array(frameCount)
    .fill(0)
    .map((o, i) => `/frame-image/frame-image-${i + 1}.png`);

  const playhead = { frame: 0 };
  const images: HTMLImageElement[] = [];

  return { placeholderImage, imageURLS, playhead, images };
}
