import React, { memo } from 'react';
import { Button } from './styles';

const ButtonTable = ({ children, color, onClick }) => {
  return (
    <Button color={color} onClick={onClick}>
      {children}
    </Button>
  );
};

export default memo(ButtonTable);
