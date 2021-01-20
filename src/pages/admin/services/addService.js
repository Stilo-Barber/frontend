import React, {
  useState, useMemo, memo, lazy,
} from 'react';
import { Grid } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getServicesInRequest } from '../../../store/modules/services/getServices/actions';

import { FooterAdd, WidthBtn } from './styles';
import api from '../../../services/api';

const Modal = lazy(() => import('../../../components/modal'));
const Button = lazy(() => import('../../../components/button'));
const Tooltip = lazy(() => import('../../../components/tooltip'));
const Input = lazy(() => import('../../../components/input'));
const Loading = lazy(() => import('../../../components/loading'));

const AddService = ({ open, close, data }) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    name: data && data.name ? data.name : '',
    price: data && data.price ? data.price : '',
    time_in_minutes: data && data.time_in_minutes ? data.time_in_minutes : '',
  });

  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const onSubmit = async (values) => {
    setLoading(true);
    if (!data) {
      try {
        await api.post('/services', values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false);
        Swal.fire('Muito Bem!', 'Serviço adicionado com sucesso', 'success');
        close();
        dispatch(getServicesInRequest(token));
      } catch (err) {
        setLoading(false);
        Swal.fire(
          'Que pena!',
          'Não foi possível adicionar o serviço',
          'error',
        );
      }
    } else {
      try {
        await api.put(`/services/${data.id}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false);
        Swal.fire('Muito Bem!', 'Serviço atualizado com sucesso', 'success');
        close();
        dispatch(getServicesInRequest(token));
      } catch (err) {
        setLoading(false);
        Swal.fire(
          'Que pena!',
          'Não foi possível atualizar o serviço',
          'error',
        );
      }
    }
  };

  return (
    <>
      <Modal open={open} close={close} title="Serviço" width="70%">
        {!loading ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <Input
                  width="100%"
                  label="Nome *"
                  name="name"
                  value={info.name}
                  onChange={(ev) => setInfo({ ...info, name: ev.target.value })}
                  placeholder="Digite o nome do serviço"
                  refInput={register({ required: true })}
                />
                {errors.name && <Tooltip text="Campo Obrigatório" />}
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Input
                  width="100%"
                  label="Preço *"
                  name="price"
                  value={info.price}
                  onChange={(ev) => setInfo({ ...info, price: ev.target.value })}
                  placeholder="Digite o preço"
                  refInput={register({ required: true })}
                />
                {errors.price && <Tooltip text="Campo Obrigatório" />}
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Input
                  width="100%"
                  label="Duração"
                  name="time_in_minutes"
                  value={info.time_in_minutes}
                  onChange={(ev) => setInfo({ ...info, time_in_minutes: ev.target.value })}
                  placeholder="Digite a duração (minutos)"
                  refInput={register({ required: true })}
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

export default memo(AddService);
