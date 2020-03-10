import { FrontendRoutes } from '../enums/routes';

export const isFrontendRoutes = (route: string) => {
  const feRoutes = Object.keys(FrontendRoutes).map(
    (key: string): string => FrontendRoutes[key]
  );
  return feRoutes.indexOf(route) > -1;
};
