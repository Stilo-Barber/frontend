import styled from 'styled-components';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core';

export const Container = styled(TableContainer)``;

export const Tab = styled(Table)``;

export const Header = styled(TableHead)``;

export const Row = styled(TableRow)``;

export const Cell = styled(TableCell)`
  text-align: ${(props) => (props.align ? props.align : null)} !important;

`;

export const Main = styled(TableBody)``;

export const Pagination = styled(TablePagination)`
  display: flex !important;
  justify-content: center !important;
  margin: 0 auto !important;
  padding-top: 20px !important;
`;
