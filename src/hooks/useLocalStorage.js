import { useState } from 'react';

function useLocalStorage(name, initalValue) {
  const [storageValue, setStorageValue] = useState(() => {
    const data = JSON.parse(localStorage.getItem(name));
    return data || initalValue;
  });
  const setValue = (name, value) => {
    setStorageValue(name, value);
    localStorage.setItem(name, JSON.stringify(value));
  };
  return [storageValue, setValue];
}
export { useLocalStorage };
