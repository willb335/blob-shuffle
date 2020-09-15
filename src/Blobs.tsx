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
  generation,
  children,
}) => {
  return (
    <svg width={size} height={size} onClick={(e) => split && split(e, id)}>
      {children &&
        children.map((blob, i) => {
          return (
            <React.Fragment key={blob.id + blob.generation}>
              {blob.children ? (
                <Blobs
                  {...blob}
                  // size={blob.size / (blob.generation * 2)}
                  children={blob.children}
                />
              ) : (
                <path d={path} fill={fill} />
              )}
            </React.Fragment>
          );
        })}
    </svg>
  );
};
