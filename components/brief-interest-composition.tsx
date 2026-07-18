"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export const BRIEF_INTEREST_COMPOSITION_OFFICE_SRC =
  "/brief-interest/brief-interest-office.jpg";
export const BRIEF_INTEREST_COMPOSITION_WOMAN_SRC =
  "/brief-interest/brief-interest-woman-original.png";

type BriefInterestCompositionProps = {
  copy?: ReactNode;
  className?: string;
};

type CompositionSize = {
  width: number;
  height: number;
};

const ARROW_POINTS = [
  [8, 92],
  [8, 8],
  [34, 8],
  [34, 45],
  [71, 8],
  [92, 29],
  [55, 66],
  [92, 66],
  [92, 92],
] as const;

function buildArrowPoints(squareSize: number) {
  return ARROW_POINTS.map(
    ([x, y]) => `${(x / 100) * squareSize},${(y / 100) * squareSize}`,
  ).join(" ");
}

export function BriefInterestComposition({
  copy,
  className,
}: BriefInterestCompositionProps) {
  const maskId = `brief-interest-arrow-${useId().replaceAll(":", "")}`;
  const compositionRef = useRef<HTMLElement>(null);
  const [compositionSize, setCompositionSize] = useState<CompositionSize>({
    width: 100,
    height: 100,
  });

  useLayoutEffect(() => {
    const composition = compositionRef.current;

    if (!composition) {
      return;
    }
    const observedComposition = composition;

    function updateSize() {
      const width = Math.round(observedComposition.clientWidth);
      const height = Math.round(observedComposition.clientHeight);

      if (width > 0 && height > 0) {
        setCompositionSize((current) =>
          current.width === width && current.height === height
            ? current
            : { width, height },
        );
      }
    }

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(observedComposition);

    return () => observer.disconnect();
  }, []);

  const { width, height } = compositionSize;
  const squareSize = Math.min(width, height);
  const remainderWidth = width - squareSize;
  const remainderHeight = height - squareSize;
  const remainderSize = Math.max(remainderWidth, remainderHeight);
  const copyFits =
    remainderSize >= Math.max(96, squareSize * 0.32);
  const copyStyle =
    remainderHeight > remainderWidth
      ? {
          top: squareSize + remainderHeight * 0.12,
          left: squareSize * 0.1,
          width: squareSize * 0.8,
        }
      : {
          top: squareSize * 0.1,
          left: remainderWidth * 0.12,
          width: remainderWidth * 0.76,
        };

  return (
    <section
      ref={compositionRef}
      aria-hidden="true"
      data-brief-interest-composition="true"
      className={cn(
        "relative isolate overflow-hidden bg-primary text-white",
        className,
      )}
    >
      <div
        data-brief-interest-aperture="true"
        className="absolute top-0 right-0 z-0 overflow-hidden"
        style={{ width: squareSize, height: squareSize }}
      >
        <Image
          src={BRIEF_INTEREST_COMPOSITION_OFFICE_SRC}
          alt=""
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 44vw"
          className="z-0 object-cover object-[56%_52%] brightness-[0.58] saturate-[0.72] sm:object-[54%_50%]"
        />
        <Image
          src={BRIEF_INTEREST_COMPOSITION_WOMAN_SRC}
          alt=""
          width={1024}
          height={1792}
          priority
          className="absolute -right-[5%] -bottom-[15%] z-10 h-[108%] w-auto max-w-none object-contain"
        />
      </div>

      <svg
        aria-hidden="true"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={width}
            height={height}
          >
            <rect width={width} height={height} fill="white" />
            <g transform={`translate(${remainderWidth} 0)`}>
              <polygon
                points={buildArrowPoints(squareSize)}
                fill="black"
                transform={`rotate(180 ${squareSize / 2} ${squareSize / 2})`}
              />
            </g>
          </mask>
        </defs>
        <rect
          width={width}
          height={height}
          fill="var(--primary)"
          mask={`url(#${maskId})`}
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 z-20 bg-linear-to-tr from-black/8 via-transparent to-white/5" />

      {copy && copyFits ? (
        <div
          data-brief-interest-composition-copy="true"
          className="absolute z-30 text-balance"
          style={copyStyle}
        >
          {copy}
        </div>
      ) : null}
    </section>
  );
}
