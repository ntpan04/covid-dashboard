import { bootstrapApplication } from '@angular/platform-browser';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
registerLicense('Ngo9BigBOggjGyl/Vkd+XU9FcVRDXXxIdkx0RWFcb1Z6dVFMZFlBNQtUQF1hTH5ad01jUX1dcnRXR2ZcWkd3');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
