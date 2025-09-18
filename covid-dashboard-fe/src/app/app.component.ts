import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DeathComponent } from "./components/death/death.component";
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';
import { ActiveComponent } from "./components/active/active.component";
import { ConfirmedComponent } from "./components/confirmed/confirmed.component";
import { RecoveredComponent } from "./components/recovered/recovered.component";
import { routes } from './app.routes';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, TreeMapModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-dashboard-fe';
}
