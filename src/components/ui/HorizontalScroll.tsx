import {  useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";
export default function HorizontalScroller({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 2);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  const scrollByAmount = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.max(240, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  // ✅ mouse wheel scroll horizontally
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // if user scrolls vertically, we convert to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update as any);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="hs-wrap">
      {/* ✅ left arrow */}
      <button
        type="button"
        className={["hs-arrow hs-left", canLeft ? "hs-show" : ""].join(" ")}
        onClick={() => scrollByAmount(-1)}
        aria-label="Scroll left"
      >
        <span className="hs-arrowIcon">‹</span>
      </button>

      {/* ✅ right arrow */}
      <button
        type="button"
        className={["hs-arrow hs-right", canRight ? "hs-show" : ""].join(" ")}
        onClick={() => scrollByAmount(1)}
        aria-label="Scroll right"
      >
        <span className="hs-arrowIcon">›</span>
      </button>

      {/* ✅ scroll area */}
      <div ref={ref} className="hs-row">
        <div className="hs-track">{children}</div>
      </div>

      {/* ✅ fade edges */}
      <div className={["hs-fade hs-fade-left", canLeft ? "hs-show" : ""].join(" ")} />
      <div className={["hs-fade hs-fade-right", canRight ? "hs-show" : ""].join(" ")} />
    </div>
  );
}
