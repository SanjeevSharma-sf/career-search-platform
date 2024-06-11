export const IF = ({ condition, children }) => {
  if (!condition) return null;
  return <>{children}</>;
};
