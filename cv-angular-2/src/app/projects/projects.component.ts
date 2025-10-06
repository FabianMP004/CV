import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="projects">
      <h2>Proyectos</h2>
      <p class="hint">Aquí se mostrarán proyectos de GitHub (nombre, link y estrellas/descripcion).</p>
      <ul class="project-list">
        <li class="project-item" *ngFor="let project of placeholderProjects">
          <a [href]="project.html_url" target="_blank" rel="noopener noreferrer">{{ project.name }}</a>
          <span class="meta">★ {{ project.stargazers_count }} · {{ project.description || 'Sin descripción' }}</span>
        </li>
      </ul>
    </section>
  `,
  styles: [`
    .projects { padding: 20px; }
    h2 { margin-bottom: 12px; }
    .hint { color: #666; margin-bottom: 16px; }
    .project-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
    .project-item { background: #f5f7f5; border: 1px solid #e0e6e0; border-radius: 8px; padding: 12px 14px; }
    .project-item a { font-weight: 600; text-decoration: none; color: #1b5e20; }
    .project-item a:hover { text-decoration: underline; }
    .meta { display: block; color: #555; margin-top: 6px; font-size: 0.9rem; }
  `]
})
export class ProjectsComponent {
  // Placeholder para el paso 1. Se reemplazará con datos reales en el paso 5
  placeholderProjects = [
    { name: 'Proyecto Ejemplo 1', html_url: '#', stargazers_count: 0, description: 'Ejemplo' },
    { name: 'Proyecto Ejemplo 2', html_url: '#', stargazers_count: 0, description: 'Ejemplo' },
    { name: 'Proyecto Ejemplo 3', html_url: '#', stargazers_count: 0, description: 'Ejemplo' },
  ];
}


