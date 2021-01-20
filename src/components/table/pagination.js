import React, { memo } from 'react';
import { Pagination } from './styles';

const TablePagination = ({
  rowsPerPageOptions,
  component,
  count,
  rowsPerPage,
  page,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  return (
    <Pagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      labelRowsPerPage="Linhas por página"
    />
  );
};

export default memo(TablePagination);
