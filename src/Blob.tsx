import React, { FunctionComponent } from 'react';

export interface BlobProps {
  size: number;
  path: string;
  fill: string;
  odd: number;
}

export const Blob: FunctionComponent<BlobProps> = (props) => {
  return (
    <svg width={props.size} height={props.size}>
      <path d={props.path} fill={props.fill} />
    </svg>
  );
};
