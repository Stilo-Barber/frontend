import styled from "styled-components";
import { Typography, Avatar } from '@material-ui/core';
import { RiEdit2Line, RiDeleteBinLine, RiAddLine } from 'react-icons/ri';

export const Body = styled.div`
  padding: 10px;
  color: #a1a1a1;
`;

export const IconEdit = styled(RiEdit2Line)`
  color: #fff !important;
`;

export const IconDelete = styled(RiDeleteBinLine)`
  color: #fff !important;
`;

export const IconAdd = styled(RiAddLine)`
  color: #fff !important;
`;


export const SpacingBottom = styled.div`
  margin-bottom: 19px;
`;

export const Empty = styled(Typography)`
  text-align: center !important;
  padding: 20px 0 !important;
`;

export const ImgProfile = styled(Avatar)`
  margin-left: 12px !important;
  width: 32px !important;
  height: 32px !important;
  margin-top: 3px !important;
  cursor: pointer;
`;

export const FooterAdd = styled.div`
  display: flex !important;
  justify-content: flex-end !important;

  @media (max-width: 960px) {
    flex-direction: column !important;
    justify-content: center !important;
    margin: 0 auto !important;
  }
`;

export const WidthBtn = styled.div`
  width: 100px !important;
  margin: 0 10px;

  @media (max-width: 960px) {
    flex-direction: column !important;
    justify-content: center !important;
    margin: -10px auto !important;
  }
`;

export const WarningDel = styled(Typography)`
  color: #e7515a !important;
  display: flex !important;
`;

export const NameDelUser = styled(Typography)`
  color: #e7515a !important;
  font-weight: 700 !important;
  padding-left: 3px !important;
  margin-bottom: 15px !important;
`;

export const InfoText = styled(Typography)`
  color: #0e1726 !important;
  font-weight: 700 !important;
`;