export const filterInteger = (event: KeyboardEvent): boolean => {
  const numberList = new Array(10).fill(0).map((n, i) => i + '');

  if (numberList.includes(event.key)) {
    return true;
  }
  return false;
};
