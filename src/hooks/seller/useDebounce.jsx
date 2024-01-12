import { useEffect, useState } from "react";

/**
 * Ref: https://www.appsloveworld.com/reactjs/200/95/how-to-implement-rtks-createapi-query-for-debouncing
 * @param {String} value
 * @param {Number} delay - in milliseconds
 * @returns
 */
export function useDebounce(value, delay) {
  const [debouncedvalue, setdebouncedvalue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setdebouncedvalue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedvalue;
}
