import useStickyHide from "../Hooks/useStickyHide.jsx";
import DesktopNav from "./DesktopNav";

export default function StickyNav() {
  const { navRef, isHidden } = useStickyHide({ extraHideOffsetPx: 200 });

  return (
    <div
      ref={navRef}
      className={`hdrNavWrap ${isHidden ? "hdrNavWrap--hidden" : ""}`}
    >
      <DesktopNav />
    </div>
  );
}