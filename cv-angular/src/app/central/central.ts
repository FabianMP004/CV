import { Component } from '@angular/core';

@Component({
  selector: 'app-central',
  imports: [],
  templateUrl: './central.html',
  styleUrl: './central.css'
})
export class Central {
  softSkills: string[] = [
    'Trabajo en equipo',
    'Comunicación',
    'Adaptabilidad',
    'Resolución de problemas',
    'Gestión del tiempo'
  ];
  skillFilter: string = '';
}
