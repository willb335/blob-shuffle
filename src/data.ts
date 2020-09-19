import * as blob from 'blobs/v2';

export interface BlobData {
  path: string;
  height: number;
  fill: string;
  key: string;
}

const createBlob = (height: number, seed: number): string => {
  return blob.svgPath({
    seed,
    extraPoints: 8,
    randomness: 4,
    size: height / 2,
  });
};

const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createBlobs = (columns: number, amount: number): BlobData[] => {
  const blobSize = (): [number, number] => {
    switch (columns) {
      case 3:
        return [200, 500];
      case 4:
        return [250, 600];
      case 5:
        return [400, 1000];
      default:
        return [100, 250];
    }
  };

  const twins = Array.from(Array(amount)).map((_, i) => {
    const height = randomIntFromInterval(blobSize()[0], blobSize()[1]);
    const fills = [
      '#FF0066',
      '#8A3FFC',
      '#FA4D56',
      '#F1C21B',
      '#08BDBA',
      '#0F62FE',
      '#24A148',
    ];
    const seed = Math.random();
    const fill = fills[randomIntFromInterval(0, 6)];

    return Array.from(Array(2)).map((_, j) => {
      return {
        key: Date.now().toString() + j + i,
        path: createBlob(height, seed),
        height: height,
        fill,
      };
    });
  });

  return twins.flat();
};
