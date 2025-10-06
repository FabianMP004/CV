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
    h2 { margin-bottom: 12px; font-size: 2rem; color: #2a3a2a; }
    .hint { color: #666; margin-bottom: 20px; }
    .state { color: #555; margin: 12px 0; }
    .state.error { color: #b00020; }

    .project-list { 
      list-style: none; padding: 0; margin: 0; 
      display: grid; gap: 16px; 
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    }
    .project-item { 
      background: linear-gradient(180deg, #f8fbf8, #f1f5f1);
      border: 1px solid #e0e6e0; 
      border-radius: 12px; 
      padding: 16px 18px; 
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
      transition: transform .2s ease, box-shadow .2s ease;
    }
    .project-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(0,0,0,0.10);
    }
    .project-item a { font-weight: 700; text-decoration: none; color: #1b5e20; font-size: 1.05rem; }
    .project-item a:hover { text-decoration: underline; }
    .meta { display: block; color: #4a4a4a; margin-top: 8px; font-size: 0.92rem; }
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


