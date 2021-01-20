import React, { memo } from 'react';
import { Container } from './styles';

const TableContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export default memo(TableContainer);
