import React, { memo } from 'react';
import { Btn, BtnDanger } from './styles';

const ButtonComponent = ({
  danger, color, text, type, onClick, width, margin,
}) => (
    <>
      {!danger && (
        <Btn
          variant="contained"
          color={color}
          danger={danger}
          type={type}
          onClick={onClick}
          width={width}
        >
          {text}
        </Btn>
      )}
      {danger && (
        <BtnDanger variant="contained" type={type} onClick={onClick} margin={margin}>
          {text}
        </BtnDanger>
      )}
    </>
  );

export default memo(ButtonComponent);
