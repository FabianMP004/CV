import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  template: `
    <h3>Lista de Trabajos</h3>
    <ul>
      <li *ngFor="let job of data.jobs">{{ job }}</li>
    </ul>
  `
})
export class JobsComponent {
  constructor(public data: DataService) {}
}
