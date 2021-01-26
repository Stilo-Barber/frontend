import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';
import {
  MainMenu,
  OptionMenu,
  IconHome,
  BarberIcon,
  ServicesIcon,
  AppointmentIcon,
  LogoutIcon,
  TextMenu,
  Redirect,
} from './styles';




const Menu = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  return (
    <MainMenu>
      <Redirect to="/admin">
        <OptionMenu>
          <IconHome fontSize="small" />
          <TextMenu>Início</TextMenu>
        </OptionMenu>
      </Redirect>

      <Redirect to="/admin/appointments">
        <OptionMenu>
          <AppointmentIcon />
          <TextMenu>Agendamento</TextMenu>
        </OptionMenu>
      </Redirect>

      <Redirect to="/admin/barbers">
        <OptionMenu>
          <BarberIcon />
          <TextMenu>Barbeiros</TextMenu>
        </OptionMenu>
      </Redirect>

      <Redirect to="/admin/services">
        <OptionMenu>
          <ServicesIcon />
          <TextMenu>Serviços</TextMenu>
        </OptionMenu>
      </Redirect>

        <OptionMenu onClick={() => dispatch(signOut(token))} style={{cursor: "pointer"}}>
          <LogoutIcon />
          <TextMenu>Sair</TextMenu>
        </OptionMenu>
    </MainMenu>
)};

export default memo(Menu);
