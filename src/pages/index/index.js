import React, { useState, useMemo } from "react";
import { Body, Welcome, Services } from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { getBarbersInRequest } from '../../store/modules/barbers/getBarbers/actions';
import CardBarber from "../../components/cardBarbers";
import CardServices from "../../components/cardServices";
import Loading from "../../components/loading"

const Index = () => {
  const [open, setOpen] = useState(false);
  const [currentBarber, setCurrentBarber] = useState({});
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const barbers = useSelector((state) => state.barbers);
  const user = useSelector((state) => state.user);

  useMemo(() => {
    dispatch(getBarbersInRequest(token));
  }, []);

  const handleOpen = (barber) => {
    setCurrentBarber(barber)
    setOpen(true)
  }

  return (
    <Body>
      <Welcome>Seja bem-vindo, {user.name}.</Welcome>
      <Services>Escolha um barbeiro:</Services>
      {barbers.loading && <Loading />}
      {!barbers.loading &&

      barbers.data.map(barber => 
        <CardBarber
          key={barber.id}
          onClick={() => handleOpen(barber)}
          name={barber.name}
          image={barber.image}
        />)
      
      }
      <CardServices barber={currentBarber} open={open} close={() => setOpen(false)} />

    </Body>
  );
};

export default Index;
