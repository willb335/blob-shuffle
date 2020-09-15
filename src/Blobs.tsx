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
  console.log('gen', generation);
  return (
    <svg width={size} height={size} onClick={(e) => split && split(e, id)}>
      {children?.length ? (
        children.map((blob, i) => {
          console.log('im here', blob.size);
          console.log(blob.generation);
          return (
            <React.Fragment key={blob.id + blob.generation}>
              {/* {blob.children?.length ? ( */}
              <Blobs {...blob} children={blob.children} />
              {/* ) : (
                <path d={blob.path} fill={blob.fill} />
              )} */}
            </React.Fragment>
          );
        })
      ) : (
        <path d={path} fill={fill} />
      )}
    </svg>
  );
};
