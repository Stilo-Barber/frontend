import React, { memo } from 'react';
import { Cell } from './styles';

const TableCell = ({ children, align }) => {

  return <Cell align={align}>{children}</Cell>;
};

export default memo(TableCell);
