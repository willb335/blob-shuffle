export const pathArray = (size) => {
  const BLOB_COUNT = 10000;

  return Array.from(Array(BLOB_COUNT)).map((_, i) => {
    const seed = Math.random();
    // eslint-disable-next-line
    return self.blobs2.svgPath({
      seed,
      extraPoints: 8,
      randomness: 4,
      size,
    });
  });
};
