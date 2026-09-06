"use client";

import { use, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ListGitHubRepo, ResponseError } from "@utils/types";
import ErrorContainer from "@components/UI/Error/ErrorContainer";
import { useGSAP, gsap, Observer, mediaQueries } from "@utils/gsap";
import { useInView } from "react-intersection-observer";

export default function ProjectImages({
  projects,
}: {
  projects: Promise<{
    projects: ListGitHubRepo[];
    responseError: ResponseError;
  }>;
}) {
  const projectList = use(projects);
  const containerRef = useRef<HTMLUListElement>(null);
  const imagesRef = useRef<(HTMLLIElement | null)[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const activeImageIndexRef = useRef<number | null>(null);
  const latestTouchedImageRef = useRef<number | null>(null);
  const activeImageTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Cache to store layout dimensions and prevent layout thrashing
  const dimensionsCacheRef = useRef<{
    containerWidth: number;
    imageWidths: number[];
  }>({
    containerWidth: 0,
    imageWidths: [],
  });

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "75% 0px 0px 0px",
    triggerOnce: true,
  });

  useEffect(() => {
    activeImageIndexRef.current = activeImageIndex;
  }, [activeImageIndex]);

  useGSAP(
    () => {
      if (!inView) return;

      const mm = gsap.matchMedia();

      mm.add(mediaQueries, (context) => {
        const { isDesktopScreen } = context.conditions ?? {};
        const images = gsap.utils.toArray<HTMLLIElement>(
          "li",
          containerRef.current,
        );

        // --- BATCHED DOM READS (CACHE PHASE) ---
        // perform all client DOM layout readings up front in one batch
        const containerWidth = containerRef.current?.clientWidth || 0;
        const imageWidths = images.map((img) => img.offsetWidth || 0);

        dimensionsCacheRef.current = {
          containerWidth,
          imageWidths,
        };

        const positionConfig = (index: number) => {
          return {
            x: index * 84,
            y: index * -32,
            rotate: index * 4,
          };
        };

        // Uses batched calculations from cache instead of live DOM property checking
        const getCenteredXFromCache = (index: number) => {
          const { containerWidth, imageWidths } = dimensionsCacheRef.current;
          const imgWidth = imageWidths[index] || 0;
          return (containerWidth - imgWidth) / 2;
        };

        const resetImageAnimationView = () => {
          latestTouchedImageRef.current = null;
          activeImageTimelineRef.current?.kill();
          activeImageTimelineRef.current = null;
          setActiveImageIndex(null);

          // GSAP internally batches these writes safely when layout reads aren't interleaved
          images.forEach((image, originalIndex) => {
            const homeCoords = positionConfig(originalIndex);

            gsap.to(image, {
              x: homeCoords.x,
              y: homeCoords.y,
              rotate: homeCoords.rotate,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              zIndex: originalIndex,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
          });
        };

        const animateImageView = (
          imageInfo: {
            imageEl: HTMLLIElement;
            index: number;
          } | null,
          interactionType: "click" | "hover" = "click",
        ) => {
          if (!imageInfo || imageInfo.index === -1) {
            resetImageAnimationView();
            return;
          }

          const requestedIndex = imageInfo.index;
          latestTouchedImageRef.current = requestedIndex;

          if (
            activeImageIndexRef.current === requestedIndex &&
            interactionType === "click"
          ) {
            resetImageAnimationView();
            return;
          }

          setActiveImageIndex(requestedIndex);
          activeImageTimelineRef.current?.kill();

          const targetImage = imageInfo.imageEl;
          const otherImages = images.filter((img) => img !== targetImage);

          gsap.killTweensOf([targetImage]);
          const imageTl = gsap.timeline({
            overwrite: "auto",
          });
          activeImageTimelineRef.current = imageTl;

          // --- BATCHED DOM WRITES (GSAP EXECUTION PHASE) ---
          imageTl.to(targetImage, {
            x: getCenteredXFromCache(requestedIndex), // Zero layout reads happen here now!
            y: 0,
            rotate: 0,
            scale: isDesktopScreen ? 1.75 : 1.5,
            opacity: 1,
            filter: "blur(0px)",
            zIndex: 10,
            duration: 0.5,
            ease: "power3.out",
          });

          otherImages.forEach((image) => {
            const originalIndex = images.indexOf(image);
            const homeCoords = positionConfig(originalIndex);

            gsap.to(image, {
              x: homeCoords.x,
              y: homeCoords.y,
              rotate: homeCoords.rotate,
              scale: 0.9,
              opacity: 0.3,
              filter: "blur(3px)",
              zIndex: originalIndex,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
          });
        };

        const getImageInfoToAnimate = (
          targetEl: HTMLElement | null,
          pointerEvent?: PointerEvent,
        ) => {
          if (!targetEl) return null;

          const imageEl = targetEl.closest("li") as HTMLLIElement;
          if (!imageEl) return null;

          const index = images.indexOf(imageEl);
          return { imageEl, index, event: pointerEvent };
        };

        Observer.create({
          target: containerRef.current,
          type: "touch,pointer",
          onClick: (obs) => {
            const eventTarget = (obs.event as PointerEvent)
              .target as HTMLElement;

            const info = getImageInfoToAnimate(
              eventTarget,
              obs.event as PointerEvent,
            );
            if (info) {
              animateImageView(info, "click");
            }
          },
        });
      });
    },
    { dependencies: [inView], revertOnUpdate: true, scope: containerRef },
  );

  if (projectList.responseError.status)
    return <ErrorContainer error={projectList.responseError} />;

  return (
    <ul
      ref={(el) => {
        containerRef.current = el;
        ref(el);
      }}
      className="relative col-start-1 row-start-1 flex min-h-32 w-full items-center justify-center gap-1.5 tablet:col-start-4 tablet:col-end-9 tablet:row-span-6 tablet:min-h-48 desktop:col-start-5 desktop:col-end-13 desktop:row-span-5 med-desktop:col-start-7"
    >
      {projectList.projects.map((item, index) => {
        const url =
          "https://d2kkupsaj7vt9n9k.public.blob.vercel-storage.com/" +
          item.name;
        return (
          <li
            key={item.id}
            ref={(el) => {
              if (imagesRef.current) imagesRef.current[index] = el;
            }}
            className="absolute left-0 size-28 cursor-pointer px-3 tablet:size-36 desktop:top-3.5 desktop:left-0 desktop:size-45"
            style={{
              transform: `translateX(${index * 84}px) translateY(${index * -32}px) rotate(${index * 4}deg)`,
            }}
          >
            <Image
              src={`${url}/poster.png`}
              alt={`${item.name}-poster`}
              loading="lazy"
              fill
              sizes="(max-width: 768px) 100vw, 20vw"
              className="relative rounded-xl object-contain"
            />
          </li>
        );
      })}
    </ul>
  );
}
