export const withBase = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${path.slice(1)}`;
  }
  return `${import.meta.env.BASE_URL}${path}`;
};