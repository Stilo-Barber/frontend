import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const Btn = styled(Button)`
  margin: 15px 0 !important;
  width: ${(props) => (props.width ? props.width : '100%')} !important;
  height: 48px !important;
  text-transform: none !important;
  font-size: 0.9rem !important;
`;

export const BtnDanger = styled(Button)`
  margin: ${(props) => (props.margin ? props.margin : '15px 0')} !important;
  width: ${(props) => (props.width ? props.width : '100%')} !important;
  background-color: #e7515a !important;
  color: #fff !important;
  height: 48px !important;
  text-transform: none !important;
  font-size: 16px !important;
`;
