import React, { FunctionComponent } from 'react';

export interface BlobProps {
  size: number;
  path: string;
  fill: string;
  childrenProps: BlobProps[];
  children?: JSX.Element[] | JSX.Element;
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
  childrenProps,
}) => {
  return (
    <svg width={size} height={size} onClick={(e) => split && split(e, id)}>
      {childrenProps.length > 0 ? children : <path d={path} fill={fill} />}
    </svg>
  );
};
