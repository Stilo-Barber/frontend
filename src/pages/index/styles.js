import styled from "styled-components";
import {BiExit} from "react-icons/bi"

export const Body = styled.div`
  padding: 10px;
  color: #a1a1a1;
`;


export const LogoutIcon = styled(BiExit)`
  color: #fff !important;
  text-align: center !important;
  font-size: 3vh !important;
  padding-right: 10px;

  @media(max-width: 960px) {
    font-size: 4vh !important;
  }
`;

export const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Welcome = styled.p`
  color: #a1a1a1;
  font-weight: bold;
  font-size: 19px;
`;

export const SessionServices = styled.div`
  overflow-x: auto;
  width: 100%;
  display: flex;
`;

export const Services = styled.p`
  color: #a1a1a1;
  padding: 5px 0;
`;
