import React, { memo } from 'react';
import { Row } from './styles';

const TableRow = ({ children }) => {
  return <Row>{children}</Row>;
};

export default memo(TableRow);
