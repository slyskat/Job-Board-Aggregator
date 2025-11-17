import { useEffect, useRef, useState } from "react";

import styles from "./Slider.module.css";
function Slider({ value, onChange, min, max, step = 1, className, ...props }) {
  const [isSliding, setIsSliding] = useState(null);
  const trackRef = useRef(null);

  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const minRef = useRef(min);
  const maxRef = useRef(max);
  const stepRef = useRef(step);

  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
    minRef.current = min;
    maxRef.current = max;
    stepRef.current = step;
  }, [value, onChange, min, max, step]);

  const getPercentage = (val) => {
    return ((val - minRef.current) / (maxRef.current - minRef.current)) * 100;
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
        Math.round(
          ((percentage / 100) * (maxRef.current - minRef.current)) /
            stepRef.current
        ) *
          stepRef.current +
        minRef.current;

      const currentValue = valueRef.current;

      if (isSliding === 0) {
        onChangeRef.current([
          Math.min(newValue, currentValue[1]),
          currentValue[1],
        ]);
      } else {
        onChangeRef.current([
          currentValue[0],
          Math.max(newValue, currentValue[0]),
        ]);
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
  }, [isSliding]);
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
