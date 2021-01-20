import styled from 'styled-components';

export const Button = styled.button`
  padding: 7px 10px;
  margin-right: 7px;
  border-radius: 5px;
  color: #fff;
  background-color: ${(props) => (props.color ? props.color : '#1b55e2')};
  border: none;
  cursor: pointer;
`;
