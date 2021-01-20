import React, { memo } from 'react';
import { GridMenu, MainChildren } from './styles';
import { Grid } from '@material-ui/core';
import Menu from './menu';

const MenuComponent = ({ children, show }) => {
  return (
    <>
      {show ? (
        <Grid container>
          <GridMenu item xs={12} md={1} lg={1}>
            <Menu />
          </GridMenu>
          <Grid item xs={12} md={11} lg={11}>
            <MainChildren>{children}</MainChildren>
          </Grid>
        </Grid>
      ) : (
        <span>{children}</span>
      )}
    </>
  );
};

export default memo(MenuComponent);
