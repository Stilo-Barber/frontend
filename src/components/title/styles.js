import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Body = styled.div`
  width: 100%;
  border-bottom: 1px solid #a1a1a1;
  margin-bottom: 21px;
`;

export const Main = styled.div`
  border-bottom: 2px solid #deaa3d !important;
  margin-bottom: -8px;
  margin-top: 6px;
  width: ${(props) => (props.width ? props.width : '')};
`;

export const Text = styled(Typography)`
  color: #deaa3d !important;
  font-size: 25px !important;
  font-weight: 500 !important;
  line-height: 1.2 !important;

  padding: 6px 0 !important;
  max-width: 30px !important;
`;
