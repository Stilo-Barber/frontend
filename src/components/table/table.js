import React, { memo } from 'react';
import { Tab } from './styles';

const Table = ({ children }) => {
  return <Tab>{children}</Tab>;
};

export default memo(Table);
