import { useEffect, useState, type RefObject } from "react";

/**
 * True while `ref` intersects `root` (or the viewport). Used to mount heavy
 * WebGL generator tiles only while they're on screen, so the browser's limited
 * pool of live WebGL contexts isn't exhausted by a full grid at once.
 */
export function useInView(ref: RefObject<Element>, root?: RefObject<Element | null>): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true); // no IO (e.g. jsdom) → render anyway
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: root?.current ?? null, rootMargin: "24px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, root]);
  return inView;
}
