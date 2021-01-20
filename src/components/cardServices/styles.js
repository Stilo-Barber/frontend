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
  padding: 10px;
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
