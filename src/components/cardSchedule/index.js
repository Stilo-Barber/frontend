import 'date-fns';
import ptBrLocale from "date-fns/locale/pt-BR";
import React, { useState, useMemo } from "react";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getScheduleInRequest } from '../../store/modules/schedule/getSchedule/actions';
import { getAppointmentsInRequest } from '../../store/modules/appointments/getAppointments/actions';
import createTimeSlots from "../../utils/createTimeSlots"
import { Body, Title, Flex, Text, Value, Line, Btn, Close, TimeBlock, TimeDiv } from "./styles";
import { Slide, RadioGroup, Select } from "@material-ui/core";
import api from '../../services/api';


const CardSchedule = ({ open, close, barberId, service }) => {
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
    dispatch(getScheduleInRequest(token, barberId));
    dispatch(getAppointmentsInRequest(token, barberId));
    console.log("ddd", schedule)
  }, []);


  // const onSubmit = async (values) => {
  //   setLoading(true);
  //   values = { ...values, userId: id };
  //   if (!data) {
  //     try {
  //       await api.post('/members', values, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setLoading(false);
  //       Swal.fire('Muito Bem!', 'Membro adicionar com sucesso', 'success');
  //       close();
  //       dispatch(getMembersInRequest(token, id));
  //     } catch (err) {
  //       setLoading(false);
  //       Swal.fire(
  //         'Que pena!',
  //         'Não foi possível adicionado esse membro',
  //         'error',
  //       );
  //     }
  //   } else {
  //     try {
  //       await api.put(`/members/${data.id}`, values, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setLoading(false);
  //       Swal.fire('Muito Bem!', 'Membro atualizado com sucesso', 'success');
  //       close();
  //       dispatch(getMembersInRequest(token, id));
  //     } catch (err) {
  //       setLoading(false);
  //       Swal.fire(
  //         'Que pena!',
  //         'Não foi possível atualizar esse membro',
  //         'error',
  //       );
  //     }
  //   }
  // };

  const onSubmit = async (values) => {
    console.log("submit", values)
    setLoading(true);
    
    const [ day, month, year ] = values.date.split("/")

    const aptFrom = new Date()
    aptFrom.setFullYear(year, month - 1, day)
    console.log( aptFrom)
    aptFrom.setHours(...values.time.split(":"), 0)
    console.log( aptFrom)

    const aptTo = new Date(aptFrom.getTime())
    aptTo.setMinutes(aptTo.getMinutes() + service.time_in_minutes)

    const reqValues = {
      userId: user.id,
      barberId: barberId,
      serviceId: service.serviceId,
      status: 1,
      from: aptFrom,
      to: aptTo
    };

    try {

      await api.post('/appointments', reqValues, {
        headers: { Authorization: `Bearer ${token}`},
      });

      setLoading(false);
      // Swal.fire('Muito Bem!', 'Chamado criado com sucesso', 'success');
      // close();
      // dispatch(getSupportRequestsInRequest(token, user.id));
    } catch (err) {
      setLoading(false);
      console.log(err)
      // Swal.fire(
      //   'Que pena!',
      //   'Não foi possível criar o chamado',
      //   'error',
      // );
    }
  };


  const handleChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChange = (date) => {
    console.log(date)
    setSelectedDate(date);
    console.log(date.getDay())
    console.log(date)
  };

  function disableWeekends(date) {
    return date.getDay() === 0;
  }

    useMemo(() => {
      //console.log("appointments", appointments)
      const day = schedule.data.find(item => item.day === selectedDate.getDay());
      //console.log("abc", day, currentDaySchedule, selectedDate.toLocaleDateString())
      if (day) {
        console.log("dss", day.from.slice(0,2), day.to.slice(0,2))
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
        console.log("dayAppointments", dayAppointments)

        const getTimeSlots = createTimeSlots(dayFrom, dayTo, dayAppointments, service.time_in_minutes)
        console.log("CTS", createTimeSlots(dayFrom, dayTo, dayAppointments, service.time_in_minutes), service.time_in_minutes, getTimeSlots)
        setCurrentDayFreeTimeSlots(getTimeSlots)

        // const freeTimeSlots = []
        // for (let i = dayFrom; i.getTime() < dayTo.getTime(); i.setMinutes(i.getMinutes() + 30)) {
        //   //console.log("a", i, new Date(dayAppointments[0].from).getTime(), i.getTime() )
        //   const hasAppointment = dayAppointments.filter(appointment => new Date(appointment.from).getTime() == i.getTime())
        //   if (!hasAppointment.length > 0) {
        //     freeTimeSlots.push(i)
        //     console.log("aadfsfe", i)
        //   } 
          
        // }
        //setCurrentDayFreeTimeSlots(freeTimeSlots) 
          
        //console.log(currentDayFreeTimeSlots, freeTimeSlots)
        // console.log("abc", day, currentDaySchedule, currentDaySchedule.currentFrom.getTime() < currentDaySchedule.currentTo.getTime(), currentDaySchedule.currentFrom.getTime(), currentDaySchedule.currentTo.getTime())
        // for (let i = currentDaySchedule.currentFrom; i.getTime() < currentDaySchedule.currentTo.getTime(); i.setMinutes(i.getMinutes() + 30)) {
        //   console.log("a", i)
        // }

        //console.log("just do it", selectedDate, schedule.data, dayFrom.getHours(), dayTo.getHours(), selectedDate.getDay());
      }
    }, [selectedDate]);



  //teste horários
  const handleFreeSchedule = (date) => {
    const day = schedule.data.find(item => item.day === date.getDay());
    console.log("abc", day, currentDaySchedule)
    if (day) {
      const dayFrom = new Date(date)
      dayFrom.setHours(day.from.slice(0,2))
      dayFrom.setMinutes(day.from.slice(3,5))
      const dayTo = new Date(date)
      dayTo.setHours(day.to.slice(0,2))
      dayFrom.setMinutes(day.from.slice(3,5))
      setCurrentDaySchedule({
        currentFrom: dayFrom,
        currentTo: dayTo
      })
      
      

      console.log("abc", currentDaySchedule)
      for (let i = currentDaySchedule.currentFrom; i.getTime() < currentDaySchedule.currentTo.getTime(); i.setMinutes(i.getMinutes() + 30)) {
        console.log("a", i)
      }

      console.log("just do it", date, schedule.data, dayFrom, dayTo, dayFrom.getHours(), dayTo.getHours(), date.getDay());
    }

  }

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Body>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Selecione uma data:</Title>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>


      <Grid container justify="space-around">
        {/* <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        <DatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="dd/MM/yyyy"
          value={selectedDate}
          name="date"
          shouldDisableDate={disableWeekends}
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
        {/* <TimeDiv>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            <TimeBlock value={"08:00"} control>08:00</TimeBlock>
            <TimeBlock value={"08:00"}>08:30</TimeBlock>
            <TimeBlock value={"08:00"}>09:00</TimeBlock>
            <TimeBlock value={"08:00"}>09:30</TimeBlock>
            <TimeBlock>08:00</TimeBlock>
            <TimeBlock>08:30</TimeBlock>
            <TimeBlock>09:00</TimeBlock>
            <TimeBlock>09:30</TimeBlock>
            <TimeBlock>08:00</TimeBlock>
            <TimeBlock>08:30</TimeBlock>
            <TimeBlock>09:00</TimeBlock>
            <TimeBlock>09:30</TimeBlock>
            <TimeBlock>{schedule}teste{schedule && console.log(schedule)}</TimeBlock>
          </RadioGroup>
          <TimeBlock>teste{schedule && console.log(schedule)}</TimeBlock>
        </TimeDiv> */}
        {/* <TimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
        /> */}
      </Grid>
    </MuiPickersUtilsProvider>
        <Close onClick={close}>Voltar</Close>
        <Btn type="submit">Confirmar</Btn>
        </form>
      </Body>
    </Slide>
  );
};

export default CardSchedule;