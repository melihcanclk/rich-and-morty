export const getLocalStorage = (itemName: string, initialValue: any) => {
  let localStorageItem = localStorage.getItem(itemName);

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
  }

  let parsedItem;
  localStorageItem = localStorage.getItem(itemName);

  try {
    parsedItem = JSON.parse(localStorageItem as string);
  } catch (error) {
    parsedItem = localStorageItem;
  }
  return parsedItem;
}
