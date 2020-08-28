import React from "react";
import { Body, Icon, Name } from "./styles";

const CardService = ({ icon, name }) => {
  return (
    <Body>
      <Icon>{icon}</Icon>
      <Name>{name}</Name>
    </Body>
  );
};

export default CardService;
