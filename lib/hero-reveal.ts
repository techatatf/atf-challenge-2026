/**
 * Maps Framer `scrollYProgress` (0→1 over the hero scroll range) to reveal progress.
 * Editor-tuned: complete the triangle reveal after `revealScrollFraction` of that range.
 */
export function revealProgressFromScroll(
  scrollYProgress: number,
  revealScrollFraction: number
): number {
  if (revealScrollFraction <= 0) return 1;
  const raw = scrollYProgress / revealScrollFraction;
  return Math.min(1, Math.max(0, raw));
}
