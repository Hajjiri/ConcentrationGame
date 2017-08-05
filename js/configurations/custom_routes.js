import HomePage from '@containers/HomePage';
import LoginPage from '@containers/LoginPage';
import GameBoardPage from '@containers/GameBoardPage';

export const SCREEN = {
  HOME: 'HomePage',
  LOGIN: 'LoginPage',
  GAMEBOARD: 'GameBoardPage'
}

let Routes = {};

addScreenToRoute(SCREEN.HOME, HomePage);
addScreenToRoute(SCREEN.LOGIN, LoginPage);
addScreenToRoute(SCREEN.GAMEBOARD, GameBoardPage);

function addScreenToRoute(name, component) {
  Routes[name] = { screen: component }
}

export { Routes };
