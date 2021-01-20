import React, { memo } from 'react';
import { Body } from './styles';

const TooltipComponent = ({ text }) => {
  return <Body>{text}</Body>;
};

export default memo(TooltipComponent);
