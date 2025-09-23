import { Component } from '@angular/core';
import { SkillFilterPipe } from './skill-filter.pipe';

@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
  standalone: true,
  imports: [SkillFilterPipe]
})
export class MainComponent {
  softSkills: string[] = [
    'Trabajo en equipo',
    'Comunicación',
    'Adaptabilidad',
    'Resolución de problemas',
    'Gestión del tiempo'
  ];
  skillFilter: string = '';
}
