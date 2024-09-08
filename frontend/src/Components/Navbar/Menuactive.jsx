import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Menuactive = ({ show }) => {
  const [isHidden, setIsHidden] = useState(!show);

  useEffect(() => {
    if (show) {
      setIsHidden(false);
    } else {
      const timer = setTimeout(() => {
        setIsHidden(true);
      }, 400); // Matches the animation duration

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div className={`sb-preloader ${isHidden ? "sb-hidden" : ""}`}>
      <div className="sb-preloader-bg"></div>
    </div>
  );
};

export default Menuactive;
