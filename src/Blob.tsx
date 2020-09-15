import React, { FunctionComponent } from 'react';

export interface BlobProps {
  size: number;
  path: string;
  fill: string;
  children: BlobProps[];
  split?: Function;
  id: number;
}

export const Blob: FunctionComponent<BlobProps> = ({
  size,
  path,
  fill,
  children,
  split,
  id,
}) => {
  return (
    <svg width={size} height={size} onClick={(e) => split && split(e, id)}>
      {children.length > 0 ? null : <path d={path} fill={fill} />}
      {children}
    </svg>
  );
};
