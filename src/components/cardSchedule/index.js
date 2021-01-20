import 'date-fns';
import ptBrLocale from "date-fns/locale/pt-BR";
import React, { useState, useMemo, lazy } from "react";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Swal from 'sweetalert2';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import { useForm } from 'react-hook-form';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { getScheduleInRequest } from '../../store/modules/schedule/getSchedule/actions';
import { getAppointmentsInRequest } from '../../store/modules/appointments/getAppointments/actions';
import createTimeSlots from "../../utils/createTimeSlots"
import { Body, ConfirmationScreen, Title, Flex, Text, Value, Line, Btn, Close, TimeBlock, TimeDiv } from "./styles";
import { Slide, RadioGroup, Select } from "@material-ui/core";



//const socket = io("http://back.stilobarber.com.br/");
const socket = io('http://localhost:4000');

const CardSchedule = ({ open, close, barber, service }) => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [currentDaySchedule, setCurrentDaySchedule] = useState({
    currentFrom: new Date(),
    currentTo: new Date()
  })
  const [currentDayFreeTimeSlots, setCurrentDayFreeTimeSlots] = useState([])

  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const schedule = useSelector((state) => state.schedule);
  const appointments = useSelector((state) => state.appointments);
  const user = useSelector((state) => state.user);

  useMemo(() => {
    dispatch(getScheduleInRequest(token, barber.id));
    dispatch(getAppointmentsInRequest(token, barber.id));
  }, []);

  const reload=()=>window.location.reload();

  const handleResponse = async (response) => {
    if(response) {
      await Swal.fire('Muito Bem!', 'Agendamento Confirmado', 'success');
      close();
      reload()

    } else {
      await Swal.fire('Que pena!', 'Agendamento Recusado', 'error');
      close();
      reload()
    }
    setLoading(false);
  }



  const onSubmit = async (values) => {
    setLoading(true);
    
    const [ day, month, year ] = values.date.split("/")

    const aptFrom = new Date()
    aptFrom.setFullYear(year, month - 1, day)
    aptFrom.setHours(...values.time.split(":"), 0)

    const aptTo = new Date(aptFrom.getTime())
    aptTo.setMinutes(aptTo.getMinutes() + service.time_in_minutes)

    const reqValues = {
      userId: user.id,
      barberId: barber.id,
      serviceId: service.serviceId,
      status: 1,
      from: aptFrom,
      to: aptTo,
      barberName: barber.name,
      userName: user.name,
      serviceName: service.name
    };

    try {

      socket.emit('apt.req', {
        reqValues
      });

      socket.on('apt.clientres', handleResponse);

    } catch (err) {
      setLoading(false);

    }
  };


  const handleChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    useMemo(() => {
      const day = schedule.data.find(item => item.day === selectedDate.getDay());
      if (day) {
        const dayFrom = new Date(selectedDate)
        dayFrom.setHours(day.from.slice(0,2))
        dayFrom.setMinutes(day.from.slice(3,5))
        const dayTo = new Date(selectedDate)
        dayTo.setHours(day.to.slice(0,2))
        dayTo.setMinutes(day.to.slice(3,5))
        setCurrentDaySchedule({
          currentFrom: dayFrom,
          currentTo: dayTo
        })
        
        const dayAppointments = appointments.data.filter(appointment => new Date(appointment.from).toLocaleDateString() == selectedDate.toLocaleDateString())

        const getTimeSlots = createTimeSlots(dayFrom, dayTo, dayAppointments, service.time_in_minutes)

        setCurrentDayFreeTimeSlots(getTimeSlots)

      }
    }, [selectedDate]);


  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Body>
      {!loading && (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Selecione uma data:</Title>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>


      <Grid container justify="space-around">

        <DatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="dd/MM/yyyy"
          value={selectedDate}
          name="date"
          onChange={handleDateChange}
          disablePast
          inputRef={register({ required: true })}
        />
        <Select 
          native
          value={selectedTime}
          onChange={handleChange}
          name="time"
          inputProps={{
            name: 'time',
            id: 'time',
          }}
          inputRef={register({ required: true })}
        >
          <option aria-label="None" value={""}/>
          {currentDayFreeTimeSlots && currentDayFreeTimeSlots.map((slot, i) =>
            <option key={i} value={slot}>{slot}</option>
          )}
        </Select>

      </Grid>
    </MuiPickersUtilsProvider>
        <Close onClick={close}>Voltar</Close>
        <Btn type="submit">Confirmar</Btn>
        </form> 
      )}

      {loading && <ConfirmationScreen><p>Aguardando Confirmação...</p></ConfirmationScreen>}
      </Body>
    </Slide>
  );
};

export default CardSchedule;