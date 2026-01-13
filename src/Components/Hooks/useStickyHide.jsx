import { useEffect, useRef, useState } from "react";

export default function useStickyHide({ extraHideOffsetPx = 200 } = {}) {
  const navRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    let lastY = window.scrollY;
    let ticking = false;

    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    navEl.parentNode.insertBefore(sentinel, navEl);

    let stickyStartY = null;
    let isStickyNow = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        // sentinel goes above viewport => nav is sticky
        isStickyNow = entry.boundingClientRect.top < 0 && !entry.isIntersecting;

        if (isStickyNow && stickyStartY === null) stickyStartY = window.scrollY;
        if (!isStickyNow) stickyStartY = null;
      },
      { threshold: 0 }
    );

    io.observe(sentinel);

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastY;

        if (y <= 0) {
          setIsHidden(false);
          lastY = y;
          ticking = false;
          return;
        }

        if (goingDown && isStickyNow && stickyStartY !== null && y >= stickyStartY + extraHideOffsetPx) {
          setIsHidden(true);
        }

        if (!goingDown) {
          setIsHidden(false);
        }

        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      sentinel.remove();
    };
  }, [extraHideOffsetPx]);

  return { navRef, isHidden };
}
