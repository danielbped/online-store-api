import { Router } from 'express';
import ErrorMessage from '../utils/ErrorMessage';

const router = Router({ mergeParams: true });

import { readdirSync } from 'fs';

const routesDirectory = require('path').resolve(`${__dirname}`);

const findAvailableRoutes = () => {
  readdirSync(routesDirectory).forEach((routeFile: any) => {
    try {
      if (!routeFile.endsWith('.ts')) {
        const func = Object.values(require(`${routesDirectory}/${routeFile}`))[0] as Function;
        func(router);
      }
    } catch (error) {
      console.error(error)
      console.log(`${ErrorMessage.ErrorFindingRoutes} ${routeFile}`);
    };
  });
};

findAvailableRoutes();

export default router;