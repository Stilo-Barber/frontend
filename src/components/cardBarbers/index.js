import React from "react";
import { Image, Btn, Line } from "./styles";
import { Grid } from "@material-ui/core";

const CardBarbers = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3} md={3} lg={3} alignItems="center">
        <Image />
      </Grid>
      <Grid item xs={6} md={5} lg={5}>
        <p>texto 1</p>
        <p>texto 2</p>
      </Grid>
      <Grid item xs={3} md={4} lg={4}>
        <Btn>Agendar</Btn>
      </Grid>
      <Line />
    </Grid>
  );
};

export default CardBarbers;
