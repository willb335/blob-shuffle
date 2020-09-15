import React, { FunctionComponent } from 'react';

export interface BlobsProps {
  size: number;
  path: string;
  fill: string;
  split?: Function;
  id: number;
  generation: number;
  children: BlobsProps[] | undefined;
}

export const Blobs: FunctionComponent<BlobsProps> = ({
  size,
  path,
  fill,
  split,
  id,
  children,
}) => {
  return (
    <svg width={size} height={size} onClick={(e) => split && split(e, id)}>
      {children &&
        children.map((blob, i) => {
          return (
            <React.Fragment key={blob.id + blob.generation}>
              <path d={path} fill={fill} />{' '}
              {blob.children && <Blobs {...blob} children={blob.children} />}
            </React.Fragment>
          );
        })}
    </svg>
  );
};
