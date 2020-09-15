import React, { FunctionComponent } from 'react';

interface BlobProps {
  size: number;
  path: string;
  fill: string;
  children: Blob[];
}

export const Blob: FunctionComponent<BlobProps> = ({
  size,
  path,
  fill,
  children,
}) => {
  return (
    <svg width={size} height={size}>
      {children.length > 0 ? null : <path d={path} fill={fill} />}
      {children}
    </svg>
  );
};
