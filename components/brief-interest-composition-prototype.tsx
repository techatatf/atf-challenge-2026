"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";

import officeSpace from "@/.scratch/new-problem-statement-collection/office-space.jpg";
import { BRIEF_INTEREST_WOMAN_SRC } from "@/components/brief-interest-campaign-visual";
import { cn } from "@/lib/utils";

export const BRIEF_COMPOSITION_VARIANTS = {
  A: "Balanced diagonal",
  B: "Text-led window",
  C: "Cinematic crop",
  D: "Reference poster",
  E: "Strict-angle poster",
  F: "Symmetric square",
  G: "Pixel signal",
} as const;

export type BriefCompositionVariant =
  keyof typeof BRIEF_COMPOSITION_VARIANTS;
export type BriefCompositionSurface = "popup" | "form" | "confirmation";
export type BriefCompositionViewport = "mobile" | "desktop";

type BriefInterestCompositionPrototypeProps = {
  variant: BriefCompositionVariant;
  surface: BriefCompositionSurface;
  viewport: BriefCompositionViewport;
  copy?: ReactNode;
  className?: string;
};

const ARROW_POINTS: Record<BriefCompositionVariant, string> = {
  A: "11,77 59,29 47,17 92,8 83,53 71,41 23,89",
  B: "39,92 68,35 56,29 95,5 89,52 78,44 51,98",
  C: "-23,82 52,7 38,-7 112,-12 107,62 93,48 18,123",
  D: "10,8 90,8 90,70 65,70 65,40 28,70 10,55 48,28 10,28",
  E: "10,8 90,8 90,70 65,70 65,40 35,70 15,50 37,28 10,28",
  F: "8,68 8,24 44,24 44,40 60,24 68,24 68,8 92,8 92,32 76,32 76,40 60,56 76,56 76,92 32,92",
  G: "",
};

const OFFICE_POSITION: Record<
  BriefCompositionVariant,
  Record<BriefCompositionViewport, string>
> = {
  A: {
    mobile: "object-[56%_54%]",
    desktop: "object-[52%_54%]",
  },
  B: {
    mobile: "object-[66%_52%]",
    desktop: "object-[62%_52%]",
  },
  C: {
    mobile: "object-[48%_58%]",
    desktop: "object-[46%_58%]",
  },
  D: {
    mobile: "object-[56%_52%]",
    desktop: "object-[54%_50%]",
  },
  E: {
    mobile: "object-[56%_52%]",
    desktop: "object-[54%_50%]",
  },
  F: {
    mobile: "object-[56%_52%]",
    desktop: "object-[54%_50%]",
  },
  G: {
    mobile: "object-[54%_54%]",
    desktop: "object-[52%_52%]",
  },
};

const PORTRAIT_POSITION: Record<
  BriefCompositionVariant,
  Record<
    BriefCompositionSurface,
    Record<BriefCompositionViewport, string>
  >
> = {
  A: {
    popup: {
      mobile: "-right-[1%] -bottom-[112%] h-[230%]",
      desktop: "-right-[10%] -bottom-[15%] h-[112%]",
    },
    form: {
      mobile: "-right-[2%] -bottom-[70%] h-[184%]",
      desktop: "-right-[14%] -bottom-[8%] h-[104%]",
    },
    confirmation: {
      mobile: "-right-[4%] -bottom-[48%] h-[164%]",
      desktop: "-right-[9%] -bottom-[21%] h-[124%]",
    },
  },
  B: {
    popup: {
      mobile: "-right-[14%] -bottom-[105%] h-[220%]",
      desktop: "-right-[2%] -bottom-[10%] h-[105%]",
    },
    form: {
      mobile: "-right-[12%] -bottom-[61%] h-[170%]",
      desktop: "-right-[1%] -bottom-[4%] h-[96%]",
    },
    confirmation: {
      mobile: "-right-[12%] -bottom-[42%] h-[152%]",
      desktop: "-right-[1%] -bottom-[15%] h-[114%]",
    },
  },
  C: {
    popup: {
      mobile: "-right-[28%] -bottom-[145%] h-[270%]",
      desktop: "-right-[25%] -bottom-[29%] h-[140%]",
    },
    form: {
      mobile: "-right-[27%] -bottom-[90%] h-[215%]",
      desktop: "-right-[26%] -bottom-[21%] h-[128%]",
    },
    confirmation: {
      mobile: "-right-[25%] -bottom-[67%] h-[194%]",
      desktop: "-right-[23%] -bottom-[34%] h-[150%]",
    },
  },
  D: {
    popup: {
      mobile: "-right-[2%] -bottom-[112%] h-[225%]",
      desktop: "-right-[1%] -bottom-[5%] h-[102%]",
    },
    form: {
      mobile: "-right-[7%] -bottom-[45%] h-[150%]",
      desktop: "-right-[1%] -bottom-[4%] h-[98%]",
    },
    confirmation: {
      mobile: "-right-[5%] -bottom-[39%] h-[143%]",
      desktop: "-right-[1%] -bottom-[12%] h-[111%]",
    },
  },
  E: {
    popup: {
      mobile: "-right-[2%] -bottom-[112%] h-[225%]",
      desktop: "-right-[1%] -bottom-[5%] h-[102%]",
    },
    form: {
      mobile: "-right-[7%] -bottom-[45%] h-[150%]",
      desktop: "-right-[1%] -bottom-[4%] h-[98%]",
    },
    confirmation: {
      mobile: "-right-[5%] -bottom-[39%] h-[143%]",
      desktop: "-right-[1%] -bottom-[12%] h-[111%]",
    },
  },
  F: {
    popup: {
      mobile: "-right-[5%] -bottom-[15%] h-[108%]",
      desktop: "-right-[5%] -bottom-[15%] h-[108%]",
    },
    form: {
      mobile: "-right-[5%] -bottom-[15%] h-[108%]",
      desktop: "-right-[5%] -bottom-[15%] h-[108%]",
    },
    confirmation: {
      mobile: "-right-[5%] -bottom-[15%] h-[108%]",
      desktop: "-right-[5%] -bottom-[15%] h-[108%]",
    },
  },
  G: {
    popup: {
      mobile: "left-1/2 -bottom-[135%] h-[250%] -translate-x-1/2",
      desktop: "left-1/2 -bottom-[12%] h-[118%] -translate-x-1/2",
    },
    form: {
      mobile: "left-1/2 -bottom-[58%] h-[166%] -translate-x-1/2",
      desktop: "left-1/2 -bottom-[7%] h-[104%] -translate-x-1/2",
    },
    confirmation: {
      mobile: "left-1/2 -bottom-[47%] h-[153%] -translate-x-1/2",
      desktop: "left-1/2 -bottom-[18%] h-[125%] -translate-x-1/2",
    },
  },
};

const COPY_POSITION: Record<BriefCompositionVariant, string> = {
  A: "left-[6%] top-[8%] max-w-[38%]",
  B: "left-[7%] top-[9%] max-w-[43%]",
  C: "left-[5%] top-[7%] max-w-[30%]",
  D: "left-[10%] bottom-[6%] max-w-[80%]",
  E: "left-[10%] bottom-[6%] max-w-[80%]",
  F: "",
  G: "left-[7%] bottom-[7%] max-w-[72%]",
};

function buildStrictAngleGeometry(width: number, height: number) {
  const margin = width * 0.08;
  const top = height * 0.08;
  const upperBandBottom = height * 0.28;
  const bottom = height * 0.7;
  const right = width - margin;
  const innerRight = width * 0.65;
  const firstDiagonal = Math.min(height * 0.28, width * 0.25);
  const secondDiagonal = Math.min(height * 0.2, width * 0.18);
  const lowerCenterX = innerRight - firstDiagonal;
  const leftPointX = lowerCenterX - secondDiagonal;
  const leftPointY = bottom - secondDiagonal;
  const thirdDiagonal = leftPointY - upperBandBottom;
  const upperKneeX = leftPointX + thirdDiagonal;

  return {
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    points: [
      [margin, top],
      [right, top],
      [right, bottom],
      [innerRight, bottom],
      [innerRight, bottom - firstDiagonal],
      [lowerCenterX, bottom],
      [leftPointX, leftPointY],
      [upperKneeX, upperBandBottom],
      [margin, upperBandBottom],
    ]
      .map(([x, y]) => `${x},${y}`)
      .join(" "),
  };
}

function buildSymmetricSquareGeometry(width: number, height: number) {
  const squareSize = Math.min(width, height);

  const normalizedPoints = [
    [8, 92],  // --- corner top-right
    [8, 8],   // --- corner bottom-right
    [34, 8],  // [44, 8],  // thinner - move right
    [34, 45], // [44, 40], // pocket
    [71, 8],   
    [92, 29],
    [55, 66], // [60, 56], // pocket
    [92, 66], // [92, 56], // thinner - move up
    [92, 92], // --- corner top-left
  ];

  const OgNormalizedPoints = [
    [8, 68],
    [8, 24],
    [44, 24],
    [44, 40],
    [60, 24],
    [68, 24],
    [68, 8],
    [92, 8],
    [92, 32],
    [76, 32],
    [76, 40],
    [60, 56],
    [76, 56],
    [76, 92],
    [32, 92],
  ];

  return {
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    points: normalizedPoints
    // points: OgNormalizedPoints
      .map(
        ([x, y]) =>
          `${(x / 100) * squareSize},${(y / 100) * squareSize}`,
      )
      .join(" "),
    squareSize,
  };
}

function buildPixelSignalGeometry(width: number, height: number) {
  const gridExtent = Math.min(width * 0.88, height * 0.88);
  const pitch = gridExtent / 7;
  const gutter = pitch * 0.14;
  const cellSize = pitch - gutter;
  const originX = (width - gridExtent) / 2;
  const originY = Math.max((height - gridExtent) * 0.18, height * 0.04);
  const cells = [
    [0, 6],
    [0, 5],
    [1, 5],
    [1, 4],
    [2, 4],
    [2, 3],
    [3, 3],
    [3, 2],
    [4, 2],
    [4, 1],
    [4, 0],
    [5, 0],
    [6, 0],
    [6, 1],
    [6, 2],
  ];

  return {
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    cutouts: cells.map(([column, row]) => ({
      x: originX + column * pitch + gutter / 2,
      y: originY + row * pitch + gutter / 2,
      size: cellSize,
    })),
  };
}

/**
 * PROTOTYPE — disposable layered composition used only by the composition lab.
 *
 * Layer order is deliberately fixed:
 * office → woman → opaque red foreground with transparent NE arrow → optional copy.
 */
export function BriefInterestCompositionPrototype({
  variant,
  surface,
  viewport,
  copy,
  className,
}: BriefInterestCompositionPrototypeProps) {
  const maskId = `brief-arrow-${useId().replaceAll(":", "")}`;
  const compositionRef = useRef<HTMLElement>(null);
  const [compositionSize, setCompositionSize] = useState({
    width: 100,
    height: 100,
  });

  useLayoutEffect(() => {
    if (
      (variant !== "E" && variant !== "F" && variant !== "G") ||
      !compositionRef.current
    ) {
      return;
    }

    const composition = compositionRef.current;

    function updateSize() {
      const width = Math.round(composition.clientWidth);
      const height = Math.round(composition.clientHeight);

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
    observer.observe(composition);

    return () => observer.disconnect();
  }, [variant]);

  const pixelSignalGeometry =
    variant === "G"
      ? buildPixelSignalGeometry(
          compositionSize.width,
          compositionSize.height,
        )
      : null;
  const frameGeometry =
    variant === "E"
      ? buildStrictAngleGeometry(
          compositionSize.width,
          compositionSize.height,
        )
      : variant === "F"
        ? buildSymmetricSquareGeometry(
            compositionSize.width,
            compositionSize.height,
          )
      : pixelSignalGeometry
        ? {
            viewBox: pixelSignalGeometry.viewBox,
            width: pixelSignalGeometry.width,
            height: pixelSignalGeometry.height,
            points: "",
          }
      : {
          viewBox: "0 0 100 100",
          width: 100,
          height: 100,
          points: ARROW_POINTS[variant],
        };
  const squareSize =
    variant === "F"
      ? Math.min(compositionSize.width, compositionSize.height)
      : null;
  const remainderWidth =
    squareSize === null ? 0 : compositionSize.width - squareSize;
  const remainderHeight =
    squareSize === null ? 0 : compositionSize.height - squareSize;
  const remainderSize = Math.max(remainderWidth, remainderHeight);
  const canUseSquareRemainderForCopy =
    squareSize !== null &&
    remainderSize >= Math.max(96, squareSize * 0.32);
  const squareCopyStyle =
    squareSize === null
      ? undefined
      : remainderHeight > remainderWidth
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

  const mediaLayers = (
    <>
      <Image
        src={officeSpace}
        alt=""
        fill
        priority
        sizes="(max-width: 640px) 100vw, 50vw"
        className={cn(
          "z-0 object-cover brightness-[0.58] saturate-[0.72]",
          OFFICE_POSITION[variant][viewport],
        )}
      />

      <Image
        src={BRIEF_INTEREST_WOMAN_SRC}
        alt=""
        width={1024}
        height={1792}
        unoptimized
        className={cn(
          "absolute z-10 w-auto max-w-none object-contain",
          PORTRAIT_POSITION[variant][surface][viewport],
        )}
      />
    </>
  );

  return (
    <section
      ref={compositionRef}
      data-brief-composition-variant={variant}
      data-brief-composition-surface={surface}
      data-brief-composition-viewport={viewport}
      data-angle-system={
        variant === "E" || variant === "F" ? "90-45" : undefined
      }
      data-symmetry-axis={
        variant === "F" ? "bottom-left-to-top-right" : undefined
      }
      data-square-anchor={variant === "F" ? "top-right" : undefined}
      data-aperture-system={variant === "G" ? "pixel-signal" : undefined}
      className={cn(
        "relative isolate overflow-hidden bg-primary text-white",
        className,
      )}
    >
      {squareSize === null ? (
        mediaLayers
      ) : (
        <div
          className="absolute top-0 right-0 z-0 overflow-hidden"
          style={{ width: squareSize, height: squareSize }}
        >
          {mediaLayers}
        </div>
      )}

      <svg
        aria-hidden="true"
        viewBox={frameGeometry.viewBox}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={frameGeometry.width}
            height={frameGeometry.height}
          >
            <rect
              width={frameGeometry.width}
              height={frameGeometry.height}
              fill="white"
            />
            {pixelSignalGeometry ? (
              pixelSignalGeometry.cutouts.map((cutout, index) => (
                <rect
                  key={index}
                  data-pixel-cutout="true"
                  x={cutout.x}
                  y={cutout.y}
                  width={cutout.size}
                  height={cutout.size}
                  fill="black"
                />
              ))
            ) : (
              <g
                transform={
                  variant === "F"
                    ? `translate(${remainderWidth} 0)`
                    : undefined
                }
              >
                <polygon points={frameGeometry.points} fill="black" transform={
          variant === "F" && squareSize !== null
            ? `rotate(180 ${squareSize / 2}
            ${squareSize / 2})`
            : undefined
        } />
              </g>
            )}
          </mask>
        </defs>
        <rect
          width={frameGeometry.width}
          height={frameGeometry.height}
          fill="var(--primary)"
          mask={`url(#${maskId})`}
        />
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-linear-to-tr from-black/8 via-transparent to-white/5"
      />

      {copy &&
      (variant !== "F" || canUseSquareRemainderForCopy) &&
      (variant !== "G" || viewport === "desktop") ? (
        <div
          className={cn(
            "absolute z-30 text-balance",
            variant !== "F" && COPY_POSITION[variant],
          )}
          style={variant === "F" ? squareCopyStyle : undefined}
        >
          {copy}
        </div>
      ) : null}
    </section>
  );
}
