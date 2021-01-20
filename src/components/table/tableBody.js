import React, { memo } from 'react';
import { Main } from './styles';

const TableBody = ({ children }) => {
  return <Main>{children}</Main>;
};

export default memo(TableBody);
