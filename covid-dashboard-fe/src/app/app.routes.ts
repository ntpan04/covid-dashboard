import { Routes } from '@angular/router';
import { DeathComponent } from './components/death/death.component';
import { ActiveComponent } from './components/active/active.component';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { RecoveredComponent } from './components/recovered/recovered.component';

export const routes: Routes = [
    { path: 'death', component: DeathComponent },
  { path: 'active', component: ActiveComponent },
  { path: 'confirmed', component: ConfirmedComponent },
  { path: 'recovered', component: RecoveredComponent }
];
