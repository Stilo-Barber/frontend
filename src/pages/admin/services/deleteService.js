import React, { useState, memo, lazy } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../services/api';
import { getServicesInRequest } from '../../../store/modules/services/getServices/actions';
import {
  WarningDel,
  NameDelUser,
  InfoText,
  FooterAdd,
  WidthBtn,
} from './styles';

const Loading = lazy(() => import('../../../components/loading'));
const Modal = lazy(() => import('../../../components/modal'));
const Button = lazy(() => import('../../../components/button'));

const DeleteService = ({ open, close, data }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/services/${data.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire('Muito Bem!', 'Serviço excluido com sucesso', 'success');
      setLoading(false);
      close();
      dispatch(getServicesInRequest(token));
    } catch (err) {
      Swal.fire('Que pena!', 'Não foi possível excluir o serviço', 'error');
      setLoading(false);
    }
  };

  const footer = (
    <FooterAdd>
      <WidthBtn>
        <Button text="Cancelar" onClick={close} />
      </WidthBtn>
      <WidthBtn>
        <Button danger text="Excluir" onClick={confirmDelete} />
      </WidthBtn>
    </FooterAdd>
  );

  return (
    <Modal open={open} close={close} title="Excluir serviço" footer={footer}>
      {!loading ? (
        <>
          <WarningDel>
            Você tem certeza que deseja excluir o serviço:
            <NameDelUser>{data.name}</NameDelUser>
          </WarningDel>
          <InfoText>Essa ação não poderá ser desfeita!</InfoText>
        </>
      ) : (
          <Loading />
        )}
    </Modal>
  );
};

export default memo(DeleteService);
