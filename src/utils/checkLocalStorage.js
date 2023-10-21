export const checkLocalStorage = () => {
  const number = localStorage.getItem("number");
  if (number) {
    return parseInt(number, 10);
  }
  return null;
};
