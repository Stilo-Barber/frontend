import React, { memo } from 'react';
import { Input, Label } from './styles';

const InputComponent = ({
  placeholder,
  value,
  onChange,
  label,
  type,
  refInput,
  name,
  disabled,
  width,
}) => {
  return (
    <>
      <Label>{label}</Label>
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        ref={refInput}
        width={width}
        disabled={disabled}
      />
    </>
  );
};

export default memo(InputComponent);
