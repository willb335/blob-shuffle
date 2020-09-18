import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  animation-name: rotate;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
  display: inline-block;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export interface BlobProps {
  size: number;
  path: string;
  fill: string;
}

export const Blob: FunctionComponent<BlobProps> = ({ size, path, fill }) => {
  return (
    <Svg width={size} height={size}>
      <path d={path} fill={fill} />
    </Svg>
  );
};
