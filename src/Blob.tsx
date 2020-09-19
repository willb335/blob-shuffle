import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { Item } from './Shuffle';

const Svg = styled.svg<{ isCurrentItem: boolean }>`
  /* box-shadow: 0px 10px 50px -10px rgba(0, 0, 0, 0.2); */
  border-radius: 100%;
  background-color: ${(props) => (props.isCurrentItem ? 'black' : 'none')};
`;

export interface BlobProps {
  size: number;
  path: string;
  fill: string;
  handleClick: Function;
  item: Item;
  isCurrentItem: boolean;
}

export const Blob: FunctionComponent<BlobProps> = ({
  size,
  path,
  fill,
  handleClick,
  item,
  isCurrentItem,
}) => {
  return (
    <Svg width={size} height={size} isCurrentItem={isCurrentItem}>
      <path d={path} fill={fill} onClick={() => handleClick(item)} />
    </Svg>
  );
};
