import React from "react";
import { Body, Welcome, SessionServices, Services } from "./styles";
import CardService from "../../components/cardService";
import CardBarber from "../../components/cardBarbers";
import IconRazor from "../../assets/svg/navalha.svg";
import IconDryer from "../../assets/svg/secador.svg";

const Index = () => {
  const icon1 = <img src={IconRazor} width="50px" />;
  const icon2 = <img src={IconDryer} width="50px" />;

  return (
    <Body>
      <Welcome>Seja bem vindo Rafael</Welcome>
      <Services>Nossos serviços:</Services>
      <SessionServices>
        <CardService icon={icon1} name="Barba" />
        <CardService icon={icon2} name="Cabelo" />
      </SessionServices>
      <Services>Nossos Barbeiros:</Services>
      <CardBarber />
    </Body>
  );
};

export default Index;
