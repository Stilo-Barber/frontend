import React, { useState, useMemo } from "react";
import { Body, Welcome, Services } from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { getBarbersInRequest } from '../../store/modules/barbers/getBarbers/actions';
import CardBarber from "../../components/cardBarbers";
import CardServices from "../../components/cardServices";
import Loading from "../../components/loading"

const Index = () => {
  const [open, setOpen] = useState(false);
  const [currentBarber, setCurrentBarber] = useState(0);
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const barbers = useSelector((state) => state.barbers);
  const user = useSelector((state) => state.user);

  useMemo(() => {
    dispatch(getBarbersInRequest(token));
    console.log("ddd", barbers)
  }, []);

  const handleOpen = (id) => {
    setCurrentBarber(id)
    setOpen(true)
  }

  return (
    <Body>
      <Welcome>Seja bem-vindo, {user.name}.</Welcome>
      <Services>Escolha um barbeiro:</Services>
      {barbers.loading && <Loading />}
      {!barbers.loading &&
      /* <CardBarber
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
      /> */
      barbers.data.map(barber => 
        <CardBarber
          key={barber.id}
          onClick={() => handleOpen(barber.id)}
          name={barber.name}
          image={barber.image}
        />)
      
      }
      <CardServices barberId={currentBarber} open={open} close={() => setOpen(false)} />

    </Body>
  );
};

export default Index;
