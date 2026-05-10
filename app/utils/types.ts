/**
 * List respositories for a user response types
 */
export type ListGitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
};

export interface ImageSequenceConfig {
  canvas: string | HTMLCanvasElement;
  scrollTrigger: gsap.AnimationVars["scrollTrigger"];
  onUpdate?: () => void;
}
