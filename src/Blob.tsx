import React, { FunctionComponent } from 'react';

interface BlobProps {
  width: number;
  height: number;
  path: string;
  fill: string;
}

export const Blob: FunctionComponent<BlobProps> = ({
  width,
  height,
  path,
  fill,
}) => {
  return (
    <svg width={width} height={height}>
      <path d={path} fill={fill} />
    </svg>
  );
};
