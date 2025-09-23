import { useEffect, useState } from "react";

const useScrollButtonVisibility = () => {
  const [scrollButtonVisibility, setScrollButtonVisibility] = useState(false);

  const handleScrollingHeightCheck = () => {
    const verticalScroll = window.scrollY;
    const screenHeight = window.innerHeight;
    const visibilityThreshold = screenHeight / 2;

    if (verticalScroll >= visibilityThreshold) {
      setScrollButtonVisibility(true);
    } else {
      setScrollButtonVisibility(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollingHeightCheck);

    return () => {
      window.removeEventListener("scroll", handleScrollingHeightCheck);
    };
  }, []);

  return scrollButtonVisibility;
};

export default useScrollButtonVisibility;
