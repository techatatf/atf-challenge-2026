"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "@/components/ui/motion";
import { useApplyHref } from "@/lib/use-apply-href";
import { heroEquilateralTrianglePointsAttr } from "@/lib/hero-triangle-geometry";
import {
  motion as M,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

// import { Mission } from "@/components/sections";

// --- Editor-tuned (not user-facing): triangle reveal + optional parallax ---

/** Normalized 0–1 in the hero section’s border box (ResizeObserver); triangle centroid. */
const DEV_HERO_TRIANGLE_ANCHOR = { x: 0.68, y: 0.5 } as const;

/** Multipliers on `DEV_HERO_TRIANGLE_BASE_RADIUS_FRAC * min(w,h)`. */
const DEV_HERO_TRIANGLE_MIN_SCALE = 4;
const DEV_HERO_TRIANGLE_MAX_SCALE = 12;

const DEV_HERO_REVEAL_SCROLL_FRACTION = 1;

/** Rotation (deg) at scroll rest (`rp` = 0). */
// const DEV_HERO_TRIANGLE_INITIAL_ROTATE_DEG = 100;
const DEV_HERO_TRIANGLE_INITIAL_ROTATE_DEG = -10;

/** Extra spin (deg) added by full reveal: final angle = initial + this. */
const DEV_HERO_TRIANGLE_MAX_ROTATE_DEG = 132;

/** Fraction of min(w,h) at scale 1; circumradius = this × min(w,h) × animated scale. */
const DEV_HERO_TRIANGLE_BASE_RADIUS_FRAC = 0.14;

/**
 * SVG stroke width in CSS pixels. Paired with `vectorEffect="nonScalingStroke"` on
 * the triangle polygon so width stays constant while the shape animates/resizes.
 * See `lib/hero-triangle-geometry.ts` for centered stroke, miters, and edge cases.
 */
const DEV_HERO_TRIANGLE_STROKE_WIDTH_PX = 4;

/** `0` = off; else max upward shift of the photo as % of its height. */
const DEV_HERO_PARALLAX_STRENGTH = 10;

function HeroApplyButton() {
  const applyHref = useApplyHref();
  return (
    <Button
      asChild
      size="lg"
      className="text-base px-8 py-6 bg-white text-primary border-2 hover:border-white hover:text-white"
    >
      <a href={applyHref}>Apply for the AI School</a>
    </Button>
  );
}

function HeroApplyButtonFallback() {
  return (
    <Button
      asChild
      size="lg"
      className="text-base px-8 py-6 bg-white text-primary border-2 hover:border-white hover:text-white"
    >
      <a href="/apply">Apply for the AI School</a>
    </Button>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const triangleSvgRef = useRef<SVGSVGElement | null>(null);
  const trianglePolygonRef = useRef<SVGPolygonElement | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });

  const [scrollMotionReady, setScrollMotionReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setScrollMotionReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const revealProgress = useTransform(
    scrollYProgress,
    [0, DEV_HERO_REVEAL_SCROLL_FRACTION],
    [0, 1],
    { clamp: true },
  );

  const revealProgressRef = useRef(revealProgress);

  useLayoutEffect(() => {
    revealProgressRef.current = revealProgress;
  }, [revealProgress]);

  const syncTriangleOverlay = useCallback((rp: number) => {
    const svg = triangleSvgRef.current;
    const poly = trianglePolygonRef.current;
    const { w, h } = sizeRef.current;
    if (!svg || !poly || w <= 0 || h <= 0) return;

    const triScale =
      DEV_HERO_TRIANGLE_MIN_SCALE +
      (DEV_HERO_TRIANGLE_MAX_SCALE - DEV_HERO_TRIANGLE_MIN_SCALE) * rp;
    const rot =
      DEV_HERO_TRIANGLE_INITIAL_ROTATE_DEG +
      DEV_HERO_TRIANGLE_MAX_ROTATE_DEG * rp;

    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    poly.setAttribute(
      "points",
      heroEquilateralTrianglePointsAttr(
        w,
        h,
        DEV_HERO_TRIANGLE_ANCHOR.x,
        DEV_HERO_TRIANGLE_ANCHOR.y,
        triScale,
        rot,
        DEV_HERO_TRIANGLE_BASE_RADIUS_FRAC,
      ),
    );
  }, []);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const measureAndSync = () => {
      const r = el.getBoundingClientRect();
      sizeRef.current = { w: r.width, h: r.height };
      syncTriangleOverlay(revealProgressRef.current.get());
    };

    measureAndSync();
    const ro = new ResizeObserver(measureAndSync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [syncTriangleOverlay]);

  useMotionValueEvent(revealProgress, "change", syncTriangleOverlay);

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-DEV_HERO_PARALLAX_STRENGTH}%`],
    { clamp: true },
  );

  const showParallax = DEV_HERO_PARALLAX_STRENGTH > 0 && scrollMotionReady;

  return (
    <div>
      <section
        ref={sectionRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-start py-16 px-4 md:py-24 md:px-8 lg:px-16 bg-muted"
      >
        {/* Layer 0: single photo */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {showParallax ? (
            <M.div
              className="absolute inset-0 size-full"
              style={{ y: parallaxY }}
            >
              <Image
                src="/hero-photo-placeholder/female-engineer-inspecting-robotic-arm.jpg"
                alt="Young African techies collaborating"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </M.div>
          ) : (
            <div className="absolute inset-0">
              <Image
                src="/hero-photo-placeholder/female-engineer-inspecting-robotic-arm.jpg"
                alt="Young African techies collaborating"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>
          )}
        </div>

        {/* Layer 1: stroke-only triangle; vertex math → `hero-triangle-geometry`, SVG semantics documented there */}
        <svg
          ref={triangleSvgRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 size-full"
          preserveAspectRatio="none"
          role="presentation"
        >
          <polygon
            ref={trianglePolygonRef}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={DEV_HERO_TRIANGLE_STROKE_WIDTH_PX}
            strokeLinejoin="miter"
            vectorEffect="nonScalingStroke"
          />
        </svg>

        {/* Layer 10: headline / CTA + scroll cue */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl text-center py-8 px-2 bg-primary">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Don&apos;t Just Watch the AI Revolution.{" "}
              <span className="text-white">Lead It.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8"
            >
              Join the ATF AI Challenge: The continent&apos;s largest hands-on
              Artificial Intelligence program. Upskill, form a team, and build
              solutions that solve Africa&apos;s toughest problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Suspense fallback={<HeroApplyButtonFallback />}>
                <HeroApplyButton />
              </Suspense>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>
      {/* <Mission /> */}
    </div>
  );
}
