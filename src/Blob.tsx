import React, { FunctionComponent } from 'react';

interface BlobProps {
  size: number;
  path: string;
  fill: string;
}

export const Blob: FunctionComponent<BlobProps> = ({ size, path, fill }) => {
  return (
    <svg width={size} height={size}>
      <path d={path} fill={fill} />
    </svg>
  );
};
