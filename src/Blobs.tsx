import React, { FunctionComponent } from 'react';

export interface BlobProps {
  size: number;
  path: string;
  fill: string;
  // split?: Function;
  id: number;
  generation: number;
  children: BlobProps[] | undefined;
}

export const Blob: FunctionComponent<BlobProps> = ({
  size,
  path,
  fill,
  // split,
  id,
  generation,
  children,
}) => {
  console.log('gen', generation);
  return (
    <svg width={size} height={size}>
      {children?.length ? (
        children.map((blob, i) => {
          console.log('im here', blob.size);
          console.log(blob.generation);
          return (
            <React.Fragment key={blob.id + blob.generation}>
              {/* {blob.children?.length ? ( */}
              <Blob {...blob} children={blob.children} />
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
