export const generateNextOrPrevNumber = (
  current: number,
  arrLength: number,
  direction: "previous" | "next"
) => {
  if (direction === "next") {
    if (current === arrLength - 1) {
      return 0;
    }
    return current + 1;
  } else {
    if (current === 0) {
      return arrLength - 1;
    }
    return current - 1;
  }
};
