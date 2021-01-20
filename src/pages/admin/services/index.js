import React, { useState, useMemo, lazy } from 'react';
import { Body } from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { getServicesInRequest } from '../../../store/modules/services/getServices/actions';
import formatValue from "../../../utils/formatValue"
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

const Card = lazy(() => import('../../../components/card'));
const Loading = lazy(() => import('../../../components/loading'));
const AddService = lazy(() => import('./addService'));
const DeleteService = lazy(() => import('./deleteService'));
const ButtonTable = lazy(() => import('../../../components/buttonTable'));
const Title = lazy(() => import('../../../components/title'));

const Services = () => {
  const [newService, setNewService] = useState(false);
  const [viewService, setViewService] = useState(false);
  const [dataService, setDataService] = useState({});
  const [deleteService, setDeleteService] = useState(false);
  const [order] = useState('asc');
  const [orderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const closeNewService = () => {
    setNewService(false);
  };

  const openNewService = () => {
    setNewService(true);
  };

  const closeEditService = () => {
    setViewService(false);
  };

  const closeDeleteService = () => {
    setDeleteService(false);
  };

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const services = useSelector((state) => state.services);
  const user = useSelector((state) => state.user);

  useMemo(() => {
    dispatch(getServicesInRequest(token));
    console.log("fff", services)
  }, []);

  const openEditService = (data) => {
    setDataService(data);
    setViewService(true);
  };

  const delService = (data) => {
    setDataService(data);
    setDeleteService(true);
  };

  return (
    <>
      <Body>
        <Title text="Serviços" width="110px" />
        <Card>
        <ButtonTable
            color="#28a745"
            onClick={openNewService}
          >
            <IconAdd /> Novo
          </ButtonTable>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Tempo (minutos)</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!services.loading && services && services.data.length
                                ? stableSort(services.data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data, i) => (
                                  <TableRow key={i}>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{formatValue(data.price)}</TableCell>
                                    <TableCell>{data.time_in_minutes}</TableCell>
                                    <TableCell>
                                      <ButtonTable onClick={() => openEditService(data)}>
                                        <IconEdit />
                                      </ButtonTable>
                                      <ButtonTable
                                        color="#e7515a"
                                        onClick={() => delService(data)}
                                      >
                                        <IconDelete />
                                      </ButtonTable>
                                    </TableCell>
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
      </Card>
      </Body>
      {newService && <AddService open={newService} close={closeNewService} />}
      {viewService && (
        <AddService
          open={viewService}
          close={closeEditService}
          data={dataService}
        />
      )}
      {deleteService && (
        <DeleteService
          open={deleteService}
          close={closeDeleteService}
          data={dataService}
        />
      )}   
    </>
  );
};

export default Services;
