import React, { memo } from 'react';
import { Main, Text } from './styles';

const LoadingComponent = () => {
  return (
    <Main>
      <Text>Carregando...</Text>
    </Main>
  );
};

export default memo(LoadingComponent);
