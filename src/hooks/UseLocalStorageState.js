import { useEffect, useState } from "react";

export function useLocalStorageState(key, initialState) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null || storedValue === undefined) {
      return initialState;
    }

    try {
      return JSON.parse(storedValue) !== null
        ? JSON.parse(storedValue)
        : initialState;
    } catch (error) {
      console.error("Error parsing local storage state:", error);
      return initialState;
    }
  });

  useEffect(
    function () {
      if (value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [value, key]
  );

  return [value, setValue];
}
