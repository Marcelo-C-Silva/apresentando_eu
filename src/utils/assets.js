export function assetPath(path) {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.startsWith('icons/') ? `img/${path}` : path;

  return `${normalizedBase}assets/${normalizedPath}`;
}
