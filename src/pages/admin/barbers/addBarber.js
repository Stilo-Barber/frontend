import React, {
  useState, useEffect, useMemo, memo, lazy,
} from 'react';
import { Checkbox, Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import DateFnsUtils from '@date-io/date-fns';
import {
  TimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from '../../../components/table';
import { getBarbersInRequest } from '../../../store/modules/barbers/getBarbers/actions';
import { getScheduleInRequest } from '../../../store/modules/schedule/getSchedule/actions';
import { getServicesInRequest } from '../../../store/modules/services/getServices/actions';
import { getBarbersServicesInRequest } from '../../../store/modules/barbersServices/getBarbersServices/actions';
import formatValue from '../../../utils/formatValue'




import { FooterAdd, WidthBtn, Empty } from './styles';
import api from '../../../services/api';

const Modal = lazy(() => import('../../../components/modal'));
const Button = lazy(() => import('../../../components/button'));
const Tooltip = lazy(() => import('../../../components/tooltip'));
const Input = lazy(() => import('../../../components/input'));
const Loading = lazy(() => import('../../../components/loading'));
const Card = lazy(() => import('../../../components/card'));
const ButtonTable = lazy(() => import('../../../components/buttonTable'));

const AddBarber = ({ open, close, data }) => {
  const [loading, setLoading] = useState(false);
  const [order] = useState('asc');
  const [orderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [info, setInfo] = useState({
    name: data && data.name ? data.name : '',
    email: data && data.email ? data.email : '',
    image: data && data.image ? data.image : '',
    phone: data && data.phone ? data.phone : '',
  });

  const [servicesInfo, setServicesInfo] = useState([]);


  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const schedule = useSelector((state) => state.schedule);
  const services = useSelector((state) => state.services);
  const barbersServices = useSelector((state) => state.barbersServices);
  const state = useSelector((state) => state)

  const [scheduleInfo, setScheduleInfo] = useState([
      {
        "from": new Date(new Date().setHours(0,0,0)),
        "to": new Date(new Date().setHours(0,0,0)),
        "day": 0
      },
      {
        "from": new Date(new Date().setHours(0,0,0)),
        "to": new Date(new Date().setHours(0,0,0)),
        "day": 1
      },
      {
        "from": new Date(new Date().setHours(0,0,0)),
        "to": new Date(new Date().setHours(0,0,0)),
        "day": 2
      },
      {
        "from": new Date(new Date().setHours(0,0,0)),
        "to": new Date(new Date().setHours(0,0,0)),
        "day": 3
      },
      {
        "from": new Date(new Date().setHours(0,0,0)),
        "to": new Date(new Date().setHours(0,0,0)),
        "day": 4
      },
      {
        "from": new Date(new Date().setHours(0,0,0)),
        "to": new Date(new Date().setHours(0,0,0)),
        "day": 5
      },
      {
        "from": new Date(new Date().setHours(0,0,0)),
        "to": new Date(new Date().setHours(0,0,0)),
        "day": 6
      }
  ]);

  useMemo(() => {
    dispatch(getServicesInRequest(token));
    if (data){
      dispatch(getScheduleInRequest(token, data.id));
      dispatch(getBarbersServicesInRequest(token, data.id));
    }
  }, [data]);

  useEffect(() => {
    if (data){
      const formattedScheduleData = schedule.data.map(x => { return {...x, from: new Date(new Date().setHours(...x.from.split(":"))), to: new Date(new Date().setHours(...x.to.split(":")))}})
      setScheduleInfo(formattedScheduleData)
    }

  }, [schedule]);

  useEffect(() => {
    setServicesInfo(barbersServices.data.map(bs => bs.serviceId))
  }, [barbersServices]);


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const onSubmit = async (values) => {
    setLoading(true);

    if (!data) {
      try {
        const newBarberId =  await api.post('/barbers', info, {
          headers: { Authorization: `Bearer ${token}` },
        });



        const newSchedule = scheduleInfo.map(x => {return {...x, barberId: newBarberId.data[0], from: x.from.toLocaleTimeString(), to: x.to.toLocaleTimeString()}})



        await api.post(`/schedule`, newSchedule, {
          headers: { Authorization: `Bearer ${token}` },
        });



        const newBarberServices = servicesInfo.map(s => {
          return {
            barberId: newBarberId.data[0],
            serviceId: s
          }
        })


        await api.post(`/barbers/services`, newBarberServices, {
          headers: { Authorization: `Bearer ${token}` },
        });


        setLoading(false);
        Swal.fire('Muito Bem!', 'Barbeiro adicionado com sucesso', 'success');
        close();
        dispatch(getBarbersInRequest(token));

      } catch (err) {
        setLoading(false);
        Swal.fire(
          'Que pena!',
          'Não foi possível adicionar o barbeiro',
          'error',
        );
      }
    } else {
      try {
        await api.put(`/barbers/${data.id}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const newSchedule = scheduleInfo.map(x => {return {...x, from: x.from.toLocaleTimeString(), to: x.to.toLocaleTimeString()}})

        await api.put(`/schedule/all/${data.id}`, newSchedule, {
          headers: { Authorization: `Bearer ${token}` },
        });

        await api.put(`/barbers/services/all/${data.id}`, servicesInfo, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLoading(false);
        Swal.fire('Muito Bem!', 'Barbeiro atualizado com sucesso', 'success');
        close();
        dispatch(getBarbersInRequest(token));
      } catch (err) {
        setLoading(false);
        Swal.fire(
          'Que pena!',
          'Não foi possível atualizar o barbeiro',
          'error',
        );
      }
    }
  };

  const changeBarbersServices = (id) => {
    if(servicesInfo.includes(id)) {
      setServicesInfo([...servicesInfo.filter(service => service !== id)])
    } else {
      setServicesInfo([...servicesInfo, id])
    }
  }

  return (
    <>
      <Modal open={open} close={close} title="Barbeiro" width="70%">
        {!loading ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9} lg={9}>
                <Input
                  width="100%"
                  label="Nome *"
                  name="name"
                  value={info.name}
                  onChange={(ev) => setInfo({ ...info, name: ev.target.value })}
                  placeholder="Digite o nome do barbeiro"
                  refInput={register({ required: true })}
                />
                {errors.name && <Tooltip text="Campo Obrigatório" />}
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Input
                  width="100%"
                  label="Telefone"
                  name="phone"
                  value={info.phone}
                  onChange={(ev) => setInfo({ ...info, phone: ev.target.value })}
                  placeholder="Digite o telefone"
                  refInput={register({ required: true })}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Input
                  width="100%"
                  label="Email *"
                  name="email"
                  type="email"
                  value={info.email}
                  onChange={(ev) => setInfo({ ...info, email: ev.target.value })}
                  placeholder="Digite o email"
                  refInput={register({ required: true })}
                />
                {errors.email && <Tooltip text="Campo Obrigatório" />}
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <Input
                  width="100%"
                  label="Imagem"
                  name="image"
                  value={info.image}
                  onChange={(ev) => setInfo({ ...info, image: ev.target.value })}
                  placeholder="Digite a url da imagem"
                  refInput={register}
                />
              </Grid>
              {!schedule.loading && scheduleInfo.length > 0 &&
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12} md={6} lg={6}>
                  Domingo:
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="0.from"
                      ampm={false}
                      value={scheduleInfo[0].from} 
                      onChange={(date) => setScheduleInfo([{...scheduleInfo[0], from: date }, ...scheduleInfo.slice(1)])}
                      refInput={register({ required: true })}/>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="0.to"
                      ampm={false}
                      value={scheduleInfo[0].to} 
                      onChange={(date) => setScheduleInfo([{...scheduleInfo[0], to: date }, ...scheduleInfo.slice(1)])}
                      refInput={register({ required: true })}/>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  Segunda-feira:
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="1.from"
                      ampm={false}
                      value={scheduleInfo[1].from} 
                      onChange={(date) => setScheduleInfo([...scheduleInfo.slice(0,1), {...scheduleInfo[1], from: date }, ...scheduleInfo.slice(2)])}
                      refInput={register({ required: true })}/>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="1.to"
                      ampm={false}
                      value={scheduleInfo[1].to} 
                      onChange={(date) => setScheduleInfo([...scheduleInfo.slice(0,1), {...scheduleInfo[1], to: date }, ...scheduleInfo.slice(2)])}
                      refInput={register({ required: true })}/>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  Terça-feira:
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="2.from"
                      ampm={false}
                      value={scheduleInfo[2].from} 
                      onChange={(date) => setScheduleInfo([...scheduleInfo.slice(0,2), {...scheduleInfo[2], from: date }, ...scheduleInfo.slice(3)])}
                      refInput={register({ required: true })}/>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="2.to"
                      ampm={false}
                      value={scheduleInfo[2].to} 
                      onChange={(date) => setScheduleInfo([...scheduleInfo.slice(0,2), {...scheduleInfo[2], to: date }, ...scheduleInfo.slice(3)])}
                      refInput={register({ required: true })}/>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  Quarta-feira:
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="3.from"
                      ampm={false}
                      value={scheduleInfo[3].from} 
                      onChange={(date) => setScheduleInfo([...scheduleInfo.slice(0,3), {...scheduleInfo[3], from: date }, ...scheduleInfo.slice(4)])}
                      refInput={register({ required: true })}/>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="3.to"
                      ampm={false}
                      value={scheduleInfo[3].to} 
                      onChange={(date) => setScheduleInfo([...scheduleInfo.slice(0,3), {...scheduleInfo[3], to: date }, ...scheduleInfo.slice(4)])}
                      refInput={register({ required: true })}/>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  Quinta-feira:
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="4.from"
                      ampm={false}
                      value={scheduleInfo[4].from} 
                      onChange={(date) => setScheduleInfo([...scheduleInfo.slice(0,4), {...scheduleInfo[4], from: date }, ...scheduleInfo.slice(5)])}
                      refInput={register({ required: true })}/>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="4.to"
                      ampm={false}
                      value={scheduleInfo[4].to} 
                      onChange={(date) => setScheduleInfo([...scheduleInfo.slice(0,4), {...scheduleInfo[4], to: date }, ...scheduleInfo.slice(5)])}
                      refInput={register({ required: true })}/>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  Sexta-feira:
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="5.from"
                      ampm={false}
                      value={scheduleInfo[5].from} 
                      onChange={(date) => setScheduleInfo([...scheduleInfo.slice(0,5), {...scheduleInfo[5], from: date }, ...scheduleInfo.slice(6)])}
                      refInput={register({ required: true })}/>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="5.to"
                      ampm={false}
                      value={scheduleInfo[5].to} 
                      onChange={(date) => setScheduleInfo([...scheduleInfo.slice(0,5), {...scheduleInfo[5], to: date }, ...scheduleInfo.slice(6)])}
                      refInput={register({ required: true })}/>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  Sábado:
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="6.from"
                      ampm={false}
                      value={scheduleInfo[6].from} 
                      onChange={(date) => setScheduleInfo([ ...scheduleInfo.slice(0,6), {...scheduleInfo[6], from: date }])}
                      refInput={register({ required: true })}/>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <TimePicker
                      name="6.to"
                      ampm={false}
                      value={scheduleInfo[6].to} 
                      onChange={(date) => setScheduleInfo([ ...scheduleInfo.slice(0,6), {...scheduleInfo[6], to: date }])}
                      refInput={register({ required: true })}/>
                </Grid>
              </MuiPickersUtilsProvider>}
              <Grid item xs={12} md={12} lg={12}>
              <TableContainer>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell>Ativo</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Preço</TableCell>
                        <TableCell>Tempo (minutos)</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!services.loading && !barbersServices.loading && services && services.data.length
                                        ? stableSort(services.data, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((data, i) => (
                                          <TableRow key={i}>
                                            <TableCell><Checkbox checked={servicesInfo.some(bs => bs === data.id)} onChange={() => changeBarbersServices(data.id)}/></TableCell>
                                            <TableCell>{data.name}</TableCell>
                                            <TableCell>{formatValue(data.price)}</TableCell>
                                            <TableCell>{data.time_in_minutes}</TableCell>
                                          </TableRow>
                                        ))
                                      : null}
                    </TableBody>
                  </Table>
                </TableContainer>
                {services.loading && <Loading />}
                {!services.loading  && services.data.length === 0 && (
                  <Empty>Você ainda não tem serviços cadastrados</Empty>
                )}
                <Pagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={services.data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Grid>

            </Grid>
            <FooterAdd>
              <WidthBtn>
                <Button text="Cancelar" onClick={close} />
              </WidthBtn>
              <WidthBtn>
                <Button
                  color="primary"
                  text={!data ? 'Adicionar' : 'Salvar'}
                  type="submit"
                />
              </WidthBtn>
            </FooterAdd>
          </form>
        ) : (
            <Loading />
          )}
      </Modal>
    </>
  );
};

export default memo(AddBarber);
