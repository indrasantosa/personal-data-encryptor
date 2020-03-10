interface Route {
  [state: string]: string;
}

export const FrontendRoutes: Route = {
  index: '/',
  apiTest: '/test',
  dashboard: '/dashboard',
  dashboardCfd: '/dashboard/cfd',
  dashboardFxRates: '/dashboard/fx-rates'
};

export const APIRoutes: Route = {
  fxList: '/api/fx/list',
  cfdList: '/api/report/cfd',

  account: '/api/v1/account',
  personalInfo: '/api/v1/personal-info',
  share: '/api/v1/share'
};
