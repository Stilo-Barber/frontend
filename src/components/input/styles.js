import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Input = styled.input`
  font-weight: 600;
  color: #3b3f5c;
  border-radius: 5px;
  border: 1px solid #bfc9d4;
  padding: 14px 0px 14px 5px;
  font-size: 1.8vh;
  margin-right: 0;
  width: ${(props) => (props.width ? props.width : '98%')} !important;

  &:focus {
    border: 1px solid #007bff;
    -webkit-box-shadow: 0px 0px 12px -7px rgba(0, 123, 255, 1);
    -moz-box-shadow: 0px 0px 12px -7px rgba(0, 123, 255, 1);
    box-shadow: 0px 0px 12px -7px rgba(0, 123, 255, 1);
  }

  @media (max-width: 960px) {
    font-size: 10px;
  }
`;

export const Label = styled(Typography)`
  font-size: 10px !important;
  font-weight: 700 !important;
  color: #3b3f5c !important;
  margin-bottom: 8px !important;
  text-align: left !important;
  padding-left: 2px !important;
`;
