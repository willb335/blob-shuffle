import React, { FunctionComponent } from 'react';

export interface BlobProps {
  size: number;
  path: string;
  fill: string;
  split?: Function;
  id: number;
  generation: number;
}

export const Blob: FunctionComponent<BlobProps> = ({
  size,
  path,
  fill,
  split,
  id,
}) => {
  return (
    <svg width={size} height={size} onClick={(e) => split && split(e, id)}>
      <path d={path} fill={fill} />
    </svg>
  );
};
