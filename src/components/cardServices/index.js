import React, { useState, useMemo } from "react";
import { Body, Title, Flex, Text, Value, Line, Btn, Close } from "./styles";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { Slide, Checkbox, Radio, FormControlLabel, FormControl, RadioGroup } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import { getBarbersServicesInRequest } from '../../store/modules/barbersServices/getBarbersServices/actions';
import formatValue from "../../utils/formatValue"
import CardSchedule from "../../components/cardSchedule";
import Loading from "../../components/loading"



const CardServices = ({ open, close, barber }) => {
  const [openSchedule, setOpenSchedule] = useState(false);
  const [currentService, setCurrentService] = useState(0)

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const barbersServices = useSelector((state) => state.barbersServices);

  useMemo(() => {
    dispatch(getBarbersServicesInRequest(token, barber.id));
  }, [barber.id]);

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Body>
        <Title>Qual serviço você deseja?</Title>
        {barbersServices.loading && <Loading />}
        {!barbersServices.loading && (
          <>
          <RadioGroup value={currentService} onChange={(e) => setCurrentService(e.target.value)}>
          {barbersServices.data.map(service => (
                    <>
                      <Flex style={{heigth: "42px"}}>
                        <Radio value={service.id} checked={currentService == service.id} checkedIcon={<CheckBoxIcon />} icon={<CheckBoxOutlineBlankIcon />} style={{margin: "0 20px 0 0", padding: 0, heigth: "42px"}} />
                        <Text>{service.name}</Text>
                        <Value>{formatValue(service.price)}</Value>
                      </Flex>
                      <Line />
                    </>            
              ))}  
          </RadioGroup>
          <Btn onClick={() => setOpenSchedule(true)}>Ver horários</Btn>
          <Close onClick={close}>Fechar</Close>
          <CardSchedule barber={barber} service={barbersServices.data.find(service => service.id == currentService)} open={openSchedule} close={() => setOpenSchedule(false)} />
          </>
        )}
      </Body>
    </Slide>
  );
};

export default CardServices;
