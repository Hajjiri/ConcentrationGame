import HomePage from '@containers/HomePage';
import LoginPage from '@containers/LoginPage';
import GameBoardPage from '@containers/GameBoardPage';
import ScorePage from '@containers/ScorePage';

export const SCREEN = {
  HOME: 'HomePage',
  LOGIN: 'LoginPage',
  GAMEBOARD: 'GameBoardPage',
  SCORE: 'ScorePage'
}

let Routes = {};

addScreenToRoute(SCREEN.HOME, HomePage);
addScreenToRoute(SCREEN.LOGIN, LoginPage);
addScreenToRoute(SCREEN.GAMEBOARD, GameBoardPage);
addScreenToRoute(SCREEN.SCORE, ScorePage);

function addScreenToRoute(name, component) {
  Routes[name] = { screen: component }
}

export { Routes };
