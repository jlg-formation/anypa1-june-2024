declare const ngDevMode: boolean;

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (ngDevMode === false) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {};
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
