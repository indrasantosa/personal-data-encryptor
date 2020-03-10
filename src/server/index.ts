import 'reflect-metadata';

import createApp from './app';

createApp().then(app => {
  app.listen(3000);
});
