import React, { memo } from 'react';
import { Body, BodySecondary } from './styles';

const CardComponent = ({ children, secondary }) => {
  return (
    <>
      {!secondary ? (
        <Body>{children}</Body>
      ) : (
        <BodySecondary>{children}</BodySecondary>
      )}
    </>
  );
};

export default memo(CardComponent);
