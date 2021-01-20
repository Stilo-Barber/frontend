import React from "react";
import {
  Body,
  Image,
  Block,
  NameBarber,
  DescriptionBarber,
  Icon,
  Btn,
  Line,
} from "./styles";

const CardBarbers = ({ image, name, onClick, isIcon, description }) => {
  return (
    <Body onClick={onClick}>
      {!isIcon && <Image src={image} />}
      {isIcon && image}
      <Block>
        <NameBarber>{name}</NameBarber>
        <DescriptionBarber>
          {!description && "Clique para ver horários disponíveis"}
          {description && description}
        </DescriptionBarber>
      </Block>
    </Body>
  );
};

export default CardBarbers;
