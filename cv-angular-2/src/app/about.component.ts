import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="about-container">
      <h2>👋 Sobre Mí</h2>
      <div class="profile-section">
        <div class="profile-info">
          <h3>Fabian Miranda</h3>
          <p class="title">Desarrollador Full Stack</p>
          <p class="description">
            Estudiante de Ingeniería de Sistemas apasionado por el desarrollo web y las tecnologías modernas. 
            Me especializo en crear soluciones digitales innovadoras y funcionales.
          </p>
          <div class="highlights">
            <span class="highlight">🚀 Innovación</span>
            <span class="highlight">💡 Creatividad</span>
            <span class="highlight">🎯 Resultados</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h2 {
      color: #2a3a2a;
      margin-bottom: 30px;
      font-size: 2.5rem;
      text-align: center;
    }
    
    .profile-section {
      background: linear-gradient(135deg, #f5f5f5 0%, #e8f5e8 100%);
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
    }
    
    .profile-info h3 {
      color: #2a3a2a;
      font-size: 2rem;
      margin-bottom: 10px;
    }
    
    .title {
      color: #32cd32;
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 20px;
    }
    
    .description {
      color: #555;
      line-height: 1.8;
      font-size: 1.1rem;
      margin-bottom: 25px;
    }
    
    .highlights {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
    
    .highlight {
      background: #32cd32;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }
  `]
})
export class AboutComponent {}
