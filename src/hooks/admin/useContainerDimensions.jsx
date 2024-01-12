import { useState, useEffect } from "react";

function useContainerDimensions(ref, aspectRatio) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    console.log(ref);
    function updateDimensions() {
      if (ref?.current) {
        const width = ref.current.offsetWidth;
        const height = width / aspectRatio;
        setDimensions({ width, height });
      }
    }

    window.addEventListener("resize", updateDimensions);
    updateDimensions(); // Initial call to set dimensions

    return () => window.removeEventListener("resize", updateDimensions);
  }, [ref, aspectRatio]); // Only re-run if ref or aspectRatio changes

  return dimensions;
}

export default useContainerDimensions;
