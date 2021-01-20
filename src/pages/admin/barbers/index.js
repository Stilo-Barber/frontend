import React, { useState, useMemo, memo, lazy, Suspense } from 'react';
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
import Menu from "../../../components/menu";

const Card = lazy(() => import('../../../components/card'));
const Loading = lazy(() => import('../../../components/loading'));
const AddBarber = lazy(() => import('./addBarber'));
const DeleteBarber = lazy(() => import('./deleteBarber'));
const ButtonTable = lazy(() => import('../../../components/buttonTable'));
const Title = lazy(() => import('../../../components/title'));


const Barbers = () => {
  const [newBarber, setNewBarber] = useState(false);
  const [viewBarber, setViewBarber] = useState(false);
  const [dataBarber, setDataBarber] = useState({});
  const [deleteBarber, setDeleteBarber] = useState(false);
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

  const closeNewBarber = () => {
    setNewBarber(false);
  };

  const openNewBarber = () => {
    setNewBarber(true);
  };

  const closeEditBarber = () => {
    setViewBarber(false);
  };

  const closeDeleteBarber = () => {
    setDeleteBarber(false);
  };

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const barbers = useSelector((state) => state.barbers);
  const user = useSelector((state) => state.user);

  useMemo(() => {
    dispatch(getBarbersInRequest(token));
  }, []);

  const openEditBarber = (data) => {
    setDataBarber(data);
    setViewBarber(true);
  };

  const delBarber = (data) => {
    setDataBarber(data);
    setDeleteBarber(true);
  };

  return (
    <>
      <Body>
        <Title text="Barbeiros" width="110px" />
        <Card>
          <ButtonTable
            color="#28a745"
            onClick={openNewBarber}
          >
            <IconAdd /> Novo
          </ButtonTable>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Imagem</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!barbers.loading && barbers && barbers.data.length
                                ? stableSort(barbers.data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data, i) => (
                                  <TableRow key={i}>
                                    <TableCell><ImgProfile src={data.image} width /></TableCell>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.email}</TableCell>
                                    <TableCell>{data.phone}</TableCell>
                                    <TableCell>
                                      <ButtonTable onClick={() => openEditBarber(data)}>
                                        <IconEdit />
                                      </ButtonTable>
                                      <ButtonTable
                                        color="#e7515a"
                                        onClick={() => delBarber(data)}
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
        {barbers.loading && <Loading />}
        {!barbers.loading  && barbers.data.length === 0 && (
          <Empty>Você ainda não tem barbeiros cadastrados</Empty>
        )}
        <Pagination
          rowsPerPageOptions={[5, 10, 25]}
          count={barbers.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Card>
      </Body>
      {newBarber && <AddBarber open={newBarber} close={closeNewBarber} />}
      {viewBarber && (
        <AddBarber
          open={viewBarber}
          close={closeEditBarber}
          data={dataBarber}
        />
      )}
      {deleteBarber && (
        <DeleteBarber
          open={deleteBarber}
          close={closeDeleteBarber}
          data={dataBarber}
        />
      )}   
    </>
  );
};

export default Barbers;
