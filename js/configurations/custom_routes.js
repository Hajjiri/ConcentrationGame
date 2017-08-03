import HomePage from '@containers/HomePage';
import LoginPage from '@containers/LoginPage';

export const SCREEN = {
  HOME: 'HomePage',
  LOGIN: 'LoginPage'
}

let Routes = {};

addScreenToRoute(SCREEN.HOME, HomePage);
addScreenToRoute(SCREEN.LOGIN, LoginPage);

function addScreenToRoute(name, component) {
  Routes[name] = { screen: component }
}

export { Routes };
