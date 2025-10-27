import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
  duration_ms: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
  images: SpotifyImage[];
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyTopTracksResponse {
  items: SpotifyTrack[];
  total: number;
}

export interface SpotifyTopArtistsResponse {
  items: SpotifyArtist[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.spotify.com/v1';
  
  // Tu Client ID real de Spotify
  private readonly clientId = '5a9d9263e0ea437b9a10b2dbcebe230a';
  private readonly redirectUri = 'http://localhost:4200';
  
  // Token de acceso (se obtiene mediante autenticación)
  private accessToken: string | null = null;

  /**
   * Inicializa la autenticación con Spotify
   * El usuario será redirigido a Spotify para autorizar la aplicación
   */
  initializeAuth(): void {
    const scopes = [
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-top-read',
      'user-read-private'
    ].join(' ');

    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${this.clientId}&` +
      `response_type=token&` +
      `redirect_uri=${encodeURIComponent(this.redirectUri)}&` +
      `scope=${encodeURIComponent(scopes)}`;

    window.location.href = authUrl;
  }

  /**
   * Extrae el token de acceso de la URL después de la redirección
   */
  extractAccessToken(): boolean {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    
    if (token) {
      this.accessToken = token;
      // Limpiar la URL
      window.history.replaceState({}, document.title, window.location.pathname);
      return true;
    }
    
    return false;
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.accessToken !== null;
  }

  /**
   * Obtiene la canción actualmente reproduciendo
   */
  getCurrentTrack(): Observable<SpotifyTrack | null> {
    if (!this.accessToken) {
      return of(null);
    }

    return this.http.get<any>(`${this.baseUrl}/me/player/currently-playing`, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    }).pipe(
      map(response => response.item || null),
      catchError(() => of(null))
    );
  }

  /**
   * Obtiene las canciones más escuchadas del usuario
   */
  getTopTracks(limit: number = 5, timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'): Observable<SpotifyTrack[]> {
    if (!this.accessToken) {
      return of([]);
    }

    const url = `${this.baseUrl}/me/top/tracks?limit=${limit}&time_range=${timeRange}`;
    
    return this.http.get<SpotifyTopTracksResponse>(url, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    }).pipe(
      map(response => response.items || []),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene los artistas más escuchados del usuario
   */
  getTopArtists(limit: number = 5, timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'): Observable<SpotifyArtist[]> {
    if (!this.accessToken) {
      return of([]);
    }

    const url = `${this.baseUrl}/me/top/artists?limit=${limit}&time_range=${timeRange}`;
    
    return this.http.get<SpotifyTopArtistsResponse>(url, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    }).pipe(
      map(response => response.items || []),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene información del perfil del usuario
   */
  getUserProfile(): Observable<SpotifyUser | null> {
    if (!this.accessToken) {
      return of(null);
    }

    return this.http.get<SpotifyUser>(`${this.baseUrl}/me`, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    }).pipe(
      catchError(() => of(null))
    );
  }

  /**
   * Obtiene las canciones reproducidas recientemente
   */
  getRecentlyPlayed(limit: number = 5): Observable<SpotifyTrack[]> {
    if (!this.accessToken) {
      return of([]);
    }

    const url = `${this.baseUrl}/me/player/recently-played?limit=${limit}`;
    
    return this.http.get<any>(url, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` }
    }).pipe(
      map(response => response.items?.map((item: any) => item.track) || []),
      catchError(() => of([]))
    );
  }

  /**
   * Formatea la duración de una canción de milisegundos a minutos:segundos
   */
  formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
