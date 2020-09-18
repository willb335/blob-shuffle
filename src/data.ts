import * as blob from 'blobs/v2';

export interface Data {
  css: string;
  height: number;
}

export interface BlobData {
  path: string;
  height: number;
  fill: string;
}

const createBlob = (size: number): string => {
  const seed = Math.random();
  return blob.svgPath({
    seed,
    extraPoints: 8,
    randomness: 4,
    size: size / 2 - 30,
  });
};

const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const blobs: BlobData[] = Array.from(Array(15)).map((_, i) => {
  const height = randomIntFromInterval(100, 750);
  const fills = [
    '#FF0066',
    '#8A3FFC',
    '#FA4D56',
    '#F1C21B',
    '#08BDBA',
    '#0F62FE',
    '#24A148',
  ];

  return {
    path: createBlob(height),
    height,
    fill: fills[randomIntFromInterval(0, 6)],
  };
});

export const images: Data[] = [
  {
    css:
      'url(https://images.pexels.com/photos/416430/pexels-photo-416430.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 150,
  },
  {
    css:
      'url(https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 300,
  },
  {
    css:
      'url(https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 2000,
  },
  {
    css:
      'url(https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 1400,
  },
  {
    css:
      'url(https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 300,
  },
  {
    css:
      'url(https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 600,
  },
  {
    css:
      'url(https://images.pexels.com/photos/1005644/pexels-photo-1005644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 200,
  },
  {
    css:
      'url(https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 300,
  },
  {
    css:
      'url(https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 200,
  },
  {
    css:
      'url(https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 400,
  },
  {
    css:
      'url(https://images.pexels.com/photos/988872/pexels-photo-988872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 200,
  },
  {
    css:
      'url(https://images.pexels.com/photos/249074/pexels-photo-249074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 150,
  },
  {
    css:
      'url(https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 400,
  },
  {
    css:
      'url(https://images.pexels.com/photos/380337/pexels-photo-380337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
    height: 200,
  },
];
