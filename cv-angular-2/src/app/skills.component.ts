import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <h2>Habilidades</h2>
    <ul>
      <li *ngFor="let skill of data.skills">{{ skill }}</li>
    </ul>
  `
})
export class SkillsComponent {
  constructor(public data: DataService) {}
}
