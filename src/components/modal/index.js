import React, { memo } from 'react';
import { Slide } from '@material-ui/core';
import { Main, Body, Header, Title, Content, Footer } from './styles';

const ModalComponent = ({ open, close, children, title, footer, width }) => {
  return (
    <>
      <Main open={open} onClose={close}>
        <Slide in={open}>
          <Body width={width}>
            <Header>
              <Title>{title}</Title>
            </Header>
            <Content>{children}</Content>
            <Footer>{footer}</Footer>
          </Body>
        </Slide>
      </Main>
    </>
  );
};

export default memo(ModalComponent);
