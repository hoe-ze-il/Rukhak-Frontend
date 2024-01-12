import { useState, useEffect, useCallback, useRef } from "react";

const useInfiniteScroll = (fetchData) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(2);
  const loaderRef = useRef(null);

  const fetchDataCallback = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetchData(index);
      setItems((prevItems) => [...prevItems, ...res.data]);
      setIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [fetchData, index, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchDataCallback();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchDataCallback]);

  useEffect(() => {
    fetchDataCallback();

    return () => {};
  }, [fetchDataCallback]);

  return { items, isLoading, loaderRef };
};

export default useInfiniteScroll;
