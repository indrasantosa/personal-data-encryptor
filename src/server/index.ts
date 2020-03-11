import 'reflect-metadata';
import { createConnection } from 'typeorm';

import createApp from './app';

createConnection()
  .then(connection => {
    createApp().then(app => {
      app.listen(3000);
    });
  })
  .catch(e => console.log('TypeORM connection error :', e));
