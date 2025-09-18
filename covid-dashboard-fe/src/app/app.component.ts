import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeathComponent } from "./components/death/death.component";
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, DeathComponent, TreeMapModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'covid-dashboard-fe';
}
