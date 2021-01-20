import React, { useState, useMemo, Suspense, lazy } from "react";
import { Body, Welcome, Services } from "./styles";
import { useSelector, useDispatch } from 'react-redux';

const Admin = () => {
  const user = useSelector((state) => state.user);

  return (
        <Body>
          <Welcome>Seja bem-vindo, {user.name}.</Welcome>
        </Body>
  );
};

export default Admin;
