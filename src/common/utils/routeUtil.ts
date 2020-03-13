import { pathToRegexp } from 'path-to-regexp';
import { FrontendRoutes } from '../enums/routes';

export const isFrontendRoutes = (route: string): boolean => {
  const feRoutes = Object.keys(FrontendRoutes).map(
    (key: string): string => FrontendRoutes[key]
  );
  for (let i = 0; i < feRoutes.length; i++) {
    let keys: Array<any> = [];
    const regex = pathToRegexp(feRoutes[i], keys);
    const routeParts = route.split('?');
    // Take the first part of the url
    if (regex.test(routeParts[0]) === true) {
      return true;
    }
  }
  return false;
};

export const getFileNameFromHeader = (headers: any) => {
  const fileNameHeader = headers['content-disposition'];
  const headerItems = fileNameHeader.split(';');
  const fileNameKeys = headerItems[1].trim().split('=');

  // Will return the file name
  return fileNameKeys[1].replace(/"/g, '');
};
