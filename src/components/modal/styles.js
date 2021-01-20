import styled from 'styled-components';
import { Modal, Typography } from '@material-ui/core';

export const Main = styled(Modal)`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  z-index: 1060 !important;
`;

export const Body = styled.div`
  background-color: #fff !important;
  width: ${(props) => (props.width ? props.width : '40%')};
  border-radius: 6px;
  max-height: 98vh;
  overflow: auto;
`;

export const Header = styled.div`
  padding: 12px 26px;
  border-bottom: 1px solid #e0e6ed;
`;

export const Title = styled(Typography)`
  font-weight: 700 !important;
  font-size: 20px !important;
  letter-spacing: 1px !important;
  line-height: 1.5 !important;
  color: #3b3f5c !important;
`;

export const Content = styled.div`
  padding: 12px 26px;
`;

export const Footer = styled.div`
  padding: 0 26px;
  border-top: 1px solid #e0e6ed;
`;
