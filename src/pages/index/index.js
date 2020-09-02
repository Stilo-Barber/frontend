import React, { useState } from "react";
import { Body, Welcome, Services } from "./styles";
import CardBarber from "../../components/cardBarbers";
import CardServices from "../../components/cardServices";

const Index = () => {
  const [open, setOpen] = useState(false);

  return (
    <Body>
      <Welcome>Seja bem vindo Rafael</Welcome>
      <Services>Escolha um barbeiro</Services>
      <CardBarber
        onClick={() => setOpen(true)}
        name="Guilherme Silva"
        image="https://lh3.googleusercontent.com/proxy/kkxxVjUFS4d-5vUOGRhgS4FxXbPDBWdJe4GqduEJFhEqc3_xtbUtDGziQ5F2ZIJAQhNW-QwzvlNBm5h_fxe1GKdEdbF5fpMRrN_JzVSck4kghXJgDH3FaGgA3FUaY6M"
      />
      <CardBarber
        onClick={() => setOpen(true)}
        name="João dos Santos"
        image="https://www.meiahora.com/_midias/jpg/2020/05/13/8-17135309.jpg"
      />
      <CardBarber
        onClick={() => setOpen(true)}
        name="Marcelo Kaminski"
        image="https://vouserpatrao.com.br/wp-content/uploads/2019/09/geazibarbeiro.jpg"
      />
      <CardServices open={open} close={() => setOpen(false)} />
    </Body>
  );
};

export default Index;
