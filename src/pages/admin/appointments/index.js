import React, { useState, useEffect, useMemo, memo, lazy, Suspense } from 'react';
import { Body } from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { getBarbersInRequest } from '../../../store/modules/barbers/getBarbers/actions';
import { IconEdit, IconAdd, IconDelete, Empty, ImgProfile } from './styles';
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from '../../../components/table';
import io from 'socket.io-client';
import api from '../../../services/api';



const Card = lazy(() => import('../../../components/card'));
const Loading = lazy(() => import('../../../components/loading'));
const ButtonTable = lazy(() => import('../../../components/buttonTable'));
const Title = lazy(() => import('../../../components/title'));

const socket = io('http://localhost:4000');


const Appointments = () => {
  const [requisitions, setRequisitions] = useState([])
  const [order] = useState('asc');
  const [orderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

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


  useEffect(() => {
    const handleNewRequisition = (newRequisition) => {
      setRequisitions([
        ...requisitions,
        newRequisition,
      ]);
    };
    socket.on('apt.conf', handleNewRequisition);
    return () => socket.off('apt.conf', handleNewRequisition);
  }, [requisitions]);


  const handleConfirmation = async (conf, index, data) => {
    delete data.barberName;
    delete data.userName;
    delete data.serviceName;


    if(conf) {
      await api.post('/appointments', data, {
        headers: { Authorization: `Bearer ${token}`},
      });
    }
    socket.emit('apt.panelres', conf);
    setRequisitions([...requisitions.filter((req, i) => i !== index)]);
  }

  return (
    <>
    <Body>
      <Title text="Agendamento" width="110px" />
      <Card>

<TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Barbeiro</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Dia</TableCell>
              <TableCell>Horário</TableCell>
              <TableCell>Serviço</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requisitions && requisitions.length
                              ? stableSort(requisitions, getComparator(order, orderBy))
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((data, i) => (
                                <TableRow key={i}>
                                  <TableCell>
                                    <ButtonTable color="#28a745" onClick={() => handleConfirmation(true, i, data)}>
                                      <IconEdit />
                                    </ButtonTable>
                                    <ButtonTable
                                      color="#e7515a"
                                      onClick={() => handleConfirmation(false, i, data)}
                                    >
                                      <IconDelete />
                                    </ButtonTable>
                                  </TableCell>
                                  <TableCell>{data.barberName}</TableCell>
                                  <TableCell>{data.userName}</TableCell>
                                  <TableCell>{new Date(data.from).toLocaleDateString()}</TableCell>
                                  <TableCell>{new Date(data.from).toLocaleTimeString()} - {new Date(data.to).toLocaleTimeString()}</TableCell>
                                  <TableCell>{data.serviceName}</TableCell>
                                  
                                </TableRow>
                              ))
                            : null}
          </TableBody>
        </Table>
      </TableContainer>
      {requisitions.length === 0 && (
        <Empty>Sem confirmações pendentes no momento!</Empty>
      )}
      <Pagination
        rowsPerPageOptions={[5, 10, 25]}
        count={requisitions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
    </Body>
  </>
  )
};

export default Appointments;