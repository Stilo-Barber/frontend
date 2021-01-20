import styled from "styled-components";
import { Button } from "@material-ui/core";

export const Body = styled.div`
  background-color: #fff;
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  //height: 470px;
  height: 100%;
  padding: 10px 10px 10px 10px;
`;

export const ConfirmationScreen = styled.div`
  background: rgb(29, 29, 29);
  background: linear-gradient(
    117deg,
    rgba(29, 29, 29, 1) 0%,
    rgba(66, 62, 63, 1) 100%
  );
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: auto;
    font-weight: bold;
    color: #fff;
  }
`;



export const Title = styled.p`
  font-weight: bold;
  color: #000;
`;

export const Flex = styled.div`
  display: flex;
`;

export const Text = styled.p`
  width: 60%;
`;

export const Value = styled.p`
  font-weight: bold;
`;

export const Line = styled.div`
  border-bottom: 1px solid #dcdcdc;
`;

export const Btn = styled(Button)`
  background-color: #deaa3d !important;
  color: #fff !important;
  position: absolute !important;
  bottom: 15px;
  right: 35px;
`;

export const Close = styled(Button)`
  background-color: #dcdcdc !important;
  color: #fff !important;
  position: absolute !important;
  bottom: 15px;
  right: 160px;
`;

export const TimeDiv = styled.div`
  margin: auto;
  padding: 15px;
`;

export const TimeBlock = styled(Button)`
  margin: 5px !important;
  background-color: #f50057 !important;
  color: #fff !important;
  //position: absolute !important;

  &:focus {
    background-color: #000 !important;
  }
`;
