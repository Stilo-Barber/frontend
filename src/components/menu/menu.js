import React, { memo } from 'react';
import {
  MainMenu,
  OptionMenu,
  IconHome,
  BarberIcon,
  ServicesIcon,
  AppointmentIcon,
  TextMenu,
  Redirect,
} from './styles';




const Menu = () => (
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
  </MainMenu>
);

export default memo(Menu);
