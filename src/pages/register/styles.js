import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

export const Main = styled.div`
  height: 100vh;
  width: 100%;
  background: rgb(29, 29, 29);
  color: #a1a1a1;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    117deg,
    rgba(29, 29, 29, 1) 0%,
    rgba(66, 62, 63, 1) 100%
  );
  padding-top: 40px;
  overflow: auto;
`;

export const Body = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Input = styled(TextField)`
  width: 95%;
  color: #a1a1a1 !important;
  margin-bottom: 15px !important;

  @media(min-width: 520px) {
    width: 50%;
  }

  @media(min-width: 768px) {
    width: 40%;
  }

  @media(min-width: 1024px) {
    width: 25%;
  }

  @media(min-width: 1280px) {
    width: 20%;
  }

  .MuiFormLabel-root {
    color: #a1a1a1 !important;
  }

  .MuiInputBase-input {
    color: #a1a1a1 !important;
    border-bottom: 1px solid !important;
  }
`;

export const Btn = styled(Button)`
  background-color: #deaa3d !important;
  margin: 20px auto 15px auto !important;
`;

export const Create = styled.p`
  text-align: center;
  color: #a1a1a1;
  font-weight: bold;
  padding-top: 15px;
`;
