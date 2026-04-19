/**
 * List respositories for a user response types
 */
export type ListGitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
};

export type PreviewVideoContent = {
  name: string;
  html_url: string;
  download_url?: string;
};

export interface ImageSequenceConfig {
  urls: string[];
  canvas: string | HTMLCanvasElement;
  scrollTrigger: gsap.AnimationVars["scrollTrigger"];
  onUpdate?: () => void;
}
