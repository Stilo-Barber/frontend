import React from "react";
import {
  Body,
  Image,
  Block,
  NameBarber,
  DescriptionBarber,
  Btn,
  Line,
} from "./styles";

const CardBarbers = ({ image, name, onClick }) => {
  return (
    <Body onClick={onClick}>
      <Image src={image} />
      <Block>
        <NameBarber>{name}</NameBarber>
        <DescriptionBarber>
          Clique para ver horários disponíveis
        </DescriptionBarber>
      </Block>
    </Body>
  );
};

export default CardBarbers;
