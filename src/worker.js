export const pathArray = (size, blobCount) => {
  return Array.from(Array(blobCount)).map((_, i) => {
    const seed = Math.random();
    // eslint-disable-next-line no-restricted-globals
    return self.blobs2.svgPath({
      seed,
      extraPoints: 8,
      randomness: 4,
      size,
    });
  });
};
