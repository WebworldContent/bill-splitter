import { useCallback } from "react";

const useLocalStorage = (key = "") => {
  const setItem = useCallback(
    (value) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    },
    [key]
  );

  const getItem = useCallback(
    (nativeKey) => {
      try {
        const item = window.localStorage.getItem(nativeKey);
        return item ? JSON.parse(item) : undefined;
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const removeItem = useCallback(
    () => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.log(error);
      }
    },
    [key]
  );

  return { getItem, setItem, removeItem };
};

export default useLocalStorage;