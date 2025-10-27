import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService, SpotifyTrack, SpotifyArtist, SpotifyUser } from '../spotify.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-spotify',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spotify-section">
      <h2>🎵 Mi Música</h2>
      
      <!-- Botón de autenticación -->
      <div *ngIf="!isAuthenticated" class="auth-section">
        <p>Conecta tu Spotify para mostrar tu música favorita</p>
        <button (click)="connectSpotify()" class="spotify-btn">
          Conectar con Spotify
        </button>
      </div>

      <!-- Contenido cuando está autenticado -->
      <div *ngIf="isAuthenticated" class="spotify-content">
        
        <!-- Perfil del usuario -->
        <div *ngIf="userProfile$ | async as user" class="user-profile">
          <img [src]="user.images[0]?.url || 'assets/default-avatar.png'" 
               [alt]="user.display_name" 
               class="user-avatar">
          <h3>{{ user.display_name }}</h3>
        </div>

        <!-- Canción actual -->
        <div class="current-track">
          <h3>🎧 Escuchando ahora</h3>
          <div *ngIf="currentTrack$ | async as track; else noCurrentTrack" class="track-card">
            <img [src]="track.album.images[0]?.url" 
                 [alt]="track.album.name" 
                 class="album-cover">
            <div class="track-info">
              <h4>{{ track.name }}</h4>
              <p>{{ track.artists[0]?.name }}</p>
              <p class="album-name">{{ track.album.name }}</p>
              <div class="track-actions">
                <a [href]="track.external_urls.spotify" 
                   target="_blank" 
                   class="spotify-link">
                  Escuchar en Spotify
                </a>
                <audio *ngIf="track.preview_url" 
                       [src]="track.preview_url" 
                       controls 
                       class="preview-player">
                </audio>
              </div>
            </div>
          </div>
          <ng-template #noCurrentTrack>
            <p class="no-track">No hay música reproduciéndose</p>
          </ng-template>
        </div>

        <!-- Top canciones -->
        <div class="top-tracks">
          <h3>🏆 Mis Canciones Favoritas</h3>
          <div class="tracks-grid">
            <div *ngFor="let track of topTracks$ | async; let i = index" 
                 class="track-item">
              <span class="track-number">{{ i + 1 }}</span>
              <img [src]="track.album.images[2]?.url || track.album.images[0]?.url" 
                   [alt]="track.album.name" 
                   class="track-thumbnail">
              <div class="track-details">
                <h4>{{ track.name }}</h4>
                <p>{{ track.artists[0]?.name }}</p>
              </div>
              <a [href]="track.external_urls.spotify" 
                 target="_blank" 
                 class="play-btn">
                ▶️
              </a>
            </div>
          </div>
        </div>

        <!-- Top artistas -->
        <div class="top-artists">
          <h3>🎤 Mis Artistas Favoritos</h3>
          <div class="artists-grid">
            <div *ngFor="let artist of topArtists$ | async" 
                 class="artist-item">
              <img [src]="artist.images[1]?.url || artist.images[0]?.url" 
                   [alt]="artist.name" 
                   class="artist-image">
              <h4>{{ artist.name }}</h4>
              <a [href]="artist.external_urls.spotify" 
                 target="_blank" 
                 class="artist-link">
                Ver en Spotify
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .spotify-section {
      padding: 2rem;
      background: linear-gradient(135deg, #1db954, #191414);
      color: white;
      border-radius: 15px;
      margin: 2rem 0;
    }

    .spotify-section h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .auth-section {
      text-align: center;
      padding: 2rem;
    }

    .spotify-btn {
      background: #1db954;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .spotify-btn:hover {
      background: #1ed760;
      transform: translateY(-2px);
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }

    .user-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }

    .current-track {
      margin-bottom: 2rem;
    }

    .track-card {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      align-items: center;
    }

    .album-cover {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      object-fit: cover;
    }

    .track-info h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }

    .album-name {
      font-size: 0.9rem;
      opacity: 0.8;
      margin: 0.5rem 0;
    }

    .spotify-link {
      color: #1db954;
      text-decoration: none;
      font-weight: bold;
    }

    .spotify-link:hover {
      text-decoration: underline;
    }

    .preview-player {
      margin-top: 0.5rem;
      width: 200px;
    }

    .no-track {
      text-align: center;
      padding: 2rem;
      opacity: 0.7;
    }

    .tracks-grid, .artists-grid {
      display: grid;
      gap: 1rem;
      margin-top: 1rem;
    }

    .track-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
    }

    .track-number {
      font-weight: bold;
      font-size: 1.2rem;
      min-width: 30px;
    }

    .track-thumbnail {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      object-fit: cover;
    }

    .track-details {
      flex: 1;
    }

    .track-details h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
    }

    .track-details p {
      margin: 0;
      opacity: 0.8;
      font-size: 0.9rem;
    }

    .play-btn {
      font-size: 1.5rem;
      text-decoration: none;
      transition: transform 0.2s ease;
    }

    .play-btn:hover {
      transform: scale(1.2);
    }

    .artists-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .artist-item {
      text-align: center;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
    }

    .artist-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1rem;
    }

    .artist-item h4 {
      margin: 0 0 0.5rem 0;
    }

    .artist-link {
      color: #1db954;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .artist-link:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .spotify-section {
        padding: 1rem;
      }

      .track-card {
        flex-direction: column;
        text-align: center;
      }

      .track-item {
        flex-direction: column;
        text-align: center;
      }

      .artists-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
    }
  `]
})
export class SpotifyComponent implements OnInit {
  private spotifyService = inject(SpotifyService);

  isAuthenticated = false;
  userProfile$: Observable<SpotifyUser | null> = of(null);
  currentTrack$: Observable<SpotifyTrack | null> = of(null);
  topTracks$: Observable<SpotifyTrack[]> = of([]);
  topArtists$: Observable<SpotifyArtist[]> = of([]);

  ngOnInit() {
    // Verificar si ya hay un token en la URL
    this.isAuthenticated = this.spotifyService.extractAccessToken();
    
    if (this.isAuthenticated) {
      this.loadSpotifyData();
    }
  }

  connectSpotify() {
    this.spotifyService.initializeAuth();
  }

  private loadSpotifyData() {
    this.userProfile$ = this.spotifyService.getUserProfile();
    this.currentTrack$ = this.spotifyService.getCurrentTrack();
    this.topTracks$ = this.spotifyService.getTopTracks(5, 'medium_term');
    this.topArtists$ = this.spotifyService.getTopArtists(5, 'medium_term');
  }
}
