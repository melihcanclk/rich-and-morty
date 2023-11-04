import { getLocalStorage } from "@/utils/getLocalStorage";
import { useState } from "react";

const useLocalStorage = (itemName: string, initialValue: any) => {
  const parsedItem = getLocalStorage(itemName, initialValue);

  const [item, setItem] = useState(parsedItem);

  const saveItem = (newItem: any) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  };

  return [
    item,
    saveItem,
  ];
}

export { useLocalStorage };