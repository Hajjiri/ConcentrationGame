import HomePage from '@containers/HomePage';

export const SCREEN = {
  HOME : 'HomePage'
}

let Routes = {};

addScreenToRoute(SCREEN.HOME, HomePage);

function addScreenToRoute(name, component) {
  Routes[name] = { screen: component }
}

export { Routes };
