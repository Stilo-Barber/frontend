import React from "react";
import { Body, Title, Flex, Text, Value, Line, Btn, Close } from "./styles";
import { Slide } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";

const CardServices = ({ open, close }) => {
  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Body>
        <Title>Qual serviço você deseja?</Title>
        <Flex>
          <Checkbox />
          <Text>Corte de cabelo</Text>
          <Value>R$ 35,00</Value>
        </Flex>
        <Line />
        <Flex>
          <Checkbox />
          <Text>Barba</Text>
          <Value>R$ 25,00</Value>
        </Flex>
        <Line />
        <Flex>
          <Checkbox />
          <Text>Cabelo + Barba</Text>
          <Value>R$ 50,00</Value>
        </Flex>
        <Line />
        <Btn>Ver horários</Btn>
        <Close onClick={close}>Fechar</Close>
      </Body>
    </Slide>
  );
};

export default CardServices;
