import { Component } from '@angular/core';
import { DataService } from './data.service';
import { ReversePipe } from './reverse.pipe';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ReversePipe, UpperCasePipe],
  template: `
    <h2>Habilidades</h2>
    <ul>
      <li *ngFor="let skill of data.skills">
        {{ skill | uppercase }} | {{ skill | reverse }}
      </li>
    </ul>
  `
})
export class SkillsComponent {
  constructor(public data: DataService) {}
}
