import React, { memo } from 'react';
import { Body, Main, Text } from './styles';

const TitleComponent = ({ text, width }) => {
  return (
    <Body>
      <Text>
        {text}
        <Main width={width} />
      </Text>
    </Body>
  );
};

export default memo(TitleComponent);
