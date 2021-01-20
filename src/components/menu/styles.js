import styled from 'styled-components';
import {
  Typography, Avatar, Grid, Card, Modal, ClickAwayListener, Portal,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { GoHome } from 'react-icons/go';
import { FiUsers } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import { AiOutlineSchedule } from 'react-icons/ai';
import { TiGroupOutline } from 'react-icons/ti';

import { GiHamburgerMenu } from 'react-icons/gi';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import NotificationsIcon from '@material-ui/icons/Notifications';

const ICONHEADER = `
  color: #5c1ac3 !important;
  padding: 0 9px !important;
  font-size: 3vh !important;
  margin-top: 5px !important;
  cursor: pointer;
`;

const ICONMENU = `
  color: #a1a1a1 !important;
  text-align: center !important;
  margin: 0 auto !important;
  font-size: 4vh !important;

  @media(max-width: 960px) {
    font-size: 7vh !important;
  }
`;

export const MainHeader = styled.div`
  width: 98.9%;
  position: fixed;
  padding: 0 0 0 20px;
  background-color: #fafafa;
  min-height: 80px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #fafafa;
  box-shadow: 0 4px 6px 0 rgba(85, 85, 85, 0.08),
    0 1px 20px 0 rgba(0, 0, 0, 0.07), 0px 1px 11px 0px rgba(0, 0, 0, 0.07);
  z-index: 100;
`;

export const TextLogo = styled(Typography)`
  color: #1b55e2 !important;
  font-weight: 700 !important;
  font-size: 24px !important;
  width: 100% !important;

  @media (max-width: 961px) {
    width: 70% !important;
  }
`;

export const OptionsHeader = styled.div`
  display: flex;
  padding-right: 20px;

  /* @media (max-width: 960px) {
    display: none !important;
  } */
`;

export const IconSupport = styled(HelpOutlineIcon)`
  ${ICONHEADER}
`;

export const IconSupport2 = styled(HelpOutlineIcon)`
  ${ICONMENU}
`;

export const IconNotification = styled(NotificationsNoneIcon)`
  ${ICONHEADER}
`;

export const ImgProfile = styled(Avatar)`
  margin-left: 12px !important;
  width: 32px !important;
  height: 32px !important;
  margin-top: 3px !important;
  cursor: pointer;
`;

export const ImgProfile2 = styled(Avatar)`
  width: 32px !important;
  height: 32px !important;
  margin-top: 3px !important;
  cursor: pointer;
`;

export const MainMenu = styled.div`
  width: 8%;
  background-color: #deaa3d !important;
  position: fixed;
  bottom: 0;
  top: 0;
  overflow: auto;
  padding: 20px 0;
`;

export const OptionMenu = styled.div`
  width: 100%;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  padding: 15px 0;
`;

export const TextMenu = styled(Typography)`
  color: #fafafa !important;
  text-align: center !important;
  font-size: 1.6vh !important;
  font-weight: bold;

  @media (max-width: 960px) {
    font-size: 2.7vh !important;
  }
`;

export const IconHome = styled(GoHome)`
  ${ICONMENU}
`;

export const BarberIcon = styled(PersonIcon)`
  ${ICONMENU}
`;
export const ServicesIcon = styled(BuildIcon)`
  ${ICONMENU}
`;

export const AppointmentIcon = styled(NotificationsIcon)`
  ${ICONMENU}
`;

export const GridMenu = styled(Grid)`
  @media (max-width: 960px) {
    display: none !important;
  }
`;

export const MainChildren = styled.div`
  margin: 50px 20px;

  @media (max-width: 960px) {
    margin: 50px 20px;
  }
`;

export const BurgerMenu = styled(Menu)`
  background-color: #5c1ac3 !important;
  width: 100% !important;
  top: 80px !important;
`;

export const IconBurger = styled(GiHamburgerMenu)`
  color: #5c1ac3 !important;
  font-size: 24px !important;
  margin: 6px !important;
  padding-right: 32px !important;
  z-index: 9999999999999999999 !important;
  cursor: pointer !important;

  @media (min-width: 960px) {
    display: none !important;
  }
`;

export const Redirect = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const ProfileMenu = styled(Card)`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 10vw;
  top: 70px !important;
  right: 15px !important;
  border-radius: 5px;

  @media (max-width: 1560px) {
    width: 13vw;
  }
  
  @media (max-width: 1280px) {
    width: 15vw;
  }

  @media (max-width: 960px) {
    width: 20vw;
  }

  @media (max-width: 680px) {
    width: 30vw;
  }

  @media (max-width: 480px) {
    width: 40vw;
  }

  @media (max-width: 240px) {
    width: 80vw;
  }

`;

export const ProfileDetail = styled.div`
  color: #fff;
  display: flex;
  padding: 16px 14px;
  align-content:center;
  justify-content: center;
  background: #8989ba;
  background-image: linear-gradient(to top, #a7a6cb 0%, #8989ba 52%, #8989ba 100%);
`;

export const ProfileDetailInfo = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;
`;

export const ProfileMenuItem = styled.div`
  display: flex;
  color: #212529;
  align-content: center;
  justify-content: space-evenly;
  padding: 10px;
  margin: 0 10px;
  transition: 0.1s;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid #ebddf2;
  &&:hover {
    background-color: #f1f1f1;
  }
`;

export const ProfileMenuText = styled(Typography)`
  text-align: center !important;
  font-size: 0.8rem !important;
  font-weight: 600 !important;

  @media (max-width: 1560px) {
    font-size: 0.75rem !important;
  }

  @media (max-width: 1280px) {
    font-size: 0.7rem !important;
  }

  @media (max-width: 960px) {
    font-size: 0.75rem !important;
  }
`;
