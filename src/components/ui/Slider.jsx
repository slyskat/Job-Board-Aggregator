import { useEffect, useRef, useState } from "react";

import styles from "./Slider.module.css";
function Slider({ value, onChange, min, max, step = 1, className, ...props }) {
  const [isSliding, setIsSliding] = useState(null);
  const trackRef = useRef(null);

  const getPercentage = (val) => {
    return ((val - min) / (max - min)) * 100;
  };

  const handleMouseDown = (thumbIndex, e) => {
    e.preventDefault();
    setIsSliding(thumbIndex);
  };

  useEffect(() => {
    if (isSliding !== null) return;

    const handleMouseMove = (e) => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );

      const newValue =
        Math.round(((percentage / 100) * (max - min)) / step) * step + min;

      if (isSliding === 0) {
        onChange([Math.min(newValue, value[1]), value[1]]);
      } else {
        onChange([value[0], Math.max(newValue, value[0])]);
      }
    };

    const handleMouseUp = () => {
      setIsSliding(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSliding, value, onChange, min, max, step]);
  return (
    <div className={`${styles.sliderContainer} ${className}`} {...props}>
      <div className={styles.track} ref={trackRef}>
        <div
          className={styles.range}
          style={{
            left: `${getPercentage(value[0])}%`,
            width: `${getPercentage(value[1]) - getPercentage(value[0])}%`,
          }}
        />
        <div
          className={styles.thumb}
          style={{ left: `${getPercentage(value[0])}%` }}
          onMouseDown={(e) => handleMouseDown(0, e)}
        />
        <div
          className={styles.thumb}
          style={{ left: `${getPercentage(value[1])}%` }}
          onMouseDown={(e) => handleMouseDown(1, e)}
        />
      </div>
    </div>
  );
}

export default Slider;
