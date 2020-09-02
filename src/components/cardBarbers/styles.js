import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";

export const Body = styled.div`
  background-color: #deaa3d !important;
  height: 80px;
  width: 100%;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const Image = styled(Avatar)`
  width: 50px;
`;

export const Block = styled.div`
  width: 80%;
  display: block;
  margin-left: 8px;
`;

export const Btn = styled(Button)`
  background-color: #deaa3d !important;
  margin: 5px auto 0 auto;
`;

export const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid #fff;
`;

export const NameBarber = styled.p`
  color: #fff;
  font-weight: bold;
  margin-bottom: -1px;
`;

export const DescriptionBarber = styled.p`
  color: #fff;
  font-size: 13px;
  margin-top: -1px;
`;
