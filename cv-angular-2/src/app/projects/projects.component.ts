import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GitHubService, GitHubRepo } from '../github.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="projects">
      <h2>Proyectos</h2>
      <p class="hint">Top 3 repositorios públicos de GitHub por estrellas.</p>

      <div *ngIf="loading" class="state">Cargando proyectos...</div>
      <div *ngIf="error && !loading" class="state error">No se pudieron cargar los proyectos.</div>
      <div *ngIf="!loading && !error && repos.length === 0" class="state">Sin proyectos para mostrar.</div>

      <ul *ngIf="!loading && !error && repos.length > 0" class="project-list">
        <li class="project-item" *ngFor="let project of repos">
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
    .state { color: #555; margin: 10px 0; }
    .state.error { color: #b00020; }
    .project-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
    .project-item { background: #f5f7f5; border: 1px solid #e0e6e0; border-radius: 8px; padding: 12px 14px; }
    .project-item a { font-weight: 600; text-decoration: none; color: #1b5e20; }
    .project-item a:hover { text-decoration: underline; }
    .meta { display: block; color: #555; margin-top: 6px; font-size: 0.9rem; }
  `]
})
export class ProjectsComponent implements OnInit {
  username = 'FabianMP004';
  loading = false;
  error = false;
  repos: GitHubRepo[] = [];

  constructor(private github: GitHubService) {}

  ngOnInit(): void {
    this.fetchRepos();
  }

  private fetchRepos(): void {
    this.loading = true;
    this.error = false;
    this.github.getTopRepos(this.username, 3).subscribe({
      next: (repos) => {
        this.repos = repos;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}


