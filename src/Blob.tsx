import React, { FunctionComponent } from 'react';
// import styled from 'styled-components';

import { BlobContainer } from './App';

export interface BlobProps {
  size: number;
  path: string;
  fill: string;
  id: string;
  generation: number;
  children: BlobProps[] | undefined;
  index: number;
}

export const Blob: FunctionComponent<BlobProps> = (props) => {
  return props.children ? (
    <>
      {props.children.map((blob, i) => {
        return (
          <BlobContainer key={blob.id} size={blob.size}>
            <Blob {...blob} index={props.index} />
          </BlobContainer>
        );
      })}
    </>
  ) : (
    <svg width={props.size} height={props.size}>
      <path d={props.path} fill={props.fill} />
    </svg>
  );
};
