import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface GitHubRepo {
  name: string;
  html_url: string;
  stargazers_count: number;
  description: string | null;
}

@Injectable({ providedIn: 'root' })
export class GitHubService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.github.com/users';

  getTopRepos(username: string, limit: number = 3): Observable<GitHubRepo[]> {
    const url = `${this.baseUrl}/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
    return this.http.get<GitHubRepo[]>(url).pipe(
      map(repos =>
        [...repos]
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, limit)
      ),
      catchError(() => of([]))
    );
  }
}


