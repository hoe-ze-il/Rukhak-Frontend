import { useEffect, useState } from "react";

export function useScreenAndSidebarWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(0);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    const updateSidebarWidth = () => {
      const sidebar = document.querySelector(".navbar");
      if (sidebar) {
        setSidebarWidth(sidebar.offsetWidth);
      }
    };

    const sidebar = document.querySelector(".navbar");
    if (sidebar) {
      const resizeObserver = new ResizeObserver(updateSidebarWidth);
      resizeObserver.observe(sidebar);
    }

    window.addEventListener("resize", updateScreenWidth);

    updateScreenWidth();
    updateSidebarWidth();

    // cleanup
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
      if (sidebar) {
        const resizeObserver = new ResizeObserver(updateSidebarWidth);
        resizeObserver.disconnect();
      }
    };
  }, []);

  return { screenWidth, sidebarWidth };
}
