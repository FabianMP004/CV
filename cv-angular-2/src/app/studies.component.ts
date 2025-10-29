import { Component } from '@angular/core';

@Component({
  selector: 'app-studies',
  standalone: true,
  template: `
    <div class="studies-container">
      <h2>🎓 Formación Académica</h2>
      <div class="studies-grid">
        <div class="study-card">
          <div class="study-header">
            <h3>Ingeniería de Sistemas</h3>
            <span class="status current">En curso</span>
          </div>
          <p class="institution">Universidad Nacional</p>
          <p class="period">2022 - Presente</p>
          <div class="description">
            <p>Formación integral en desarrollo de software, arquitectura de sistemas y gestión de proyectos tecnológicos.</p>
          </div>
        </div>
        
        <div class="study-card">
          <div class="study-header">
            <h3>Desarrollo Web Full Stack</h3>
            <span class="status completed">Completado</span>
          </div>
          <p class="institution">Platzi</p>
          <p class="period">2023</p>
          <div class="description">
            <p>Curso intensivo en tecnologías modernas: React, Node.js, MongoDB, y metodologías ágiles.</p>
          </div>
        </div>
        
        <div class="study-card">
          <div class="study-header">
            <h3>Certificación AWS</h3>
            <span class="status completed">Completado</span>
          </div>
          <p class="institution">Amazon Web Services</p>
          <p class="period">2024</p>
          <div class="description">
            <p>Certificación en servicios en la nube, arquitectura de soluciones y mejores prácticas de AWS.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .studies-container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    h2 {
      color: #2a3a2a;
      margin-bottom: 30px;
      font-size: 2.5rem;
      text-align: center;
    }
    
    .studies-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
    }
    
    .study-card {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      border-left: 5px solid #32cd32;
      transition: transform 0.3s ease;
    }
    
    .study-card:hover {
      transform: translateY(-5px);
    }
    
    .study-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .study-header h3 {
      color: #2a3a2a;
      font-size: 1.4rem;
      margin: 0;
    }
    
    .status {
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .status.current {
      background: #ffc107;
      color: #000;
    }
    
    .status.completed {
      background: #28a745;
      color: white;
    }
    
    .institution {
      color: #32cd32;
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 5px;
    }
    
    .period {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 15px;
    }
    
    .description p {
      color: #555;
      line-height: 1.6;
      margin: 0;
    }
  `]
})
export class StudiesComponent {}
