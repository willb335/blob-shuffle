import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  /* box-shadow: 0px 10px 50px -10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: black;
  padding: 10px; */
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
