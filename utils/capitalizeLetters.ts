export const capitalizeLetters = (string: string) => {
  if (string === "javascript") return "JavaScript";
  if (string === "typescript") return "TypeScript";
  if (string === "html") return "HTML";
  if (string === "css") return "CSS";
  return string.charAt(0).toUpperCase() + string.slice(1);
};
