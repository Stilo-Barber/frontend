import React, { memo } from 'react';
import { Header } from './styles';

const TableHeader = ({ children }) => {
  return <Header>{children}</Header>;
};

export default memo(TableHeader);
