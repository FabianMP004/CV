import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-content',
  imports: [CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContent {
  carouselIndex = 0;
  carouselItems = [
    [
      { name: 'Python', badge: 'Lenguaje de Programación', badgeClass: 'bg-success' },
      { name: 'JavaScript', badge: 'Lenguaje de Programación', badgeClass: 'bg-primary' }
    ],
    [
      { name: 'SQL', badge: 'Lenguaje de Programación / Tecnología', badgeClass: 'bg-info text-dark' },
      { name: 'HTML', badge: 'Lenguaje de Programación', badgeClass: 'bg-warning text-dark' }
    ],
    [
      { name: 'CSS', badge: 'Lenguaje de Programación', badgeClass: 'bg-secondary' },
      { name: 'Docker', badge: 'Tecnología', badgeClass: 'bg-dark' }
    ],
    [
      { name: 'Postman', badge: 'Tecnología', badgeClass: 'bg-secondary' },
      { name: 'Git', badge: 'Tecnología', badgeClass: 'bg-warning text-dark' }
    ],
    [
      { name: 'GitHub', badge: 'Tecnología', badgeClass: 'bg-info text-dark' },
      { name: 'MongoDB', badge: 'Tecnología', badgeClass: 'bg-primary' }
    ]
  ];

  prevCarousel() {
    this.carouselIndex = (this.carouselIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  nextCarousel() {
    this.carouselIndex = (this.carouselIndex + 1) % this.carouselItems.length;
  }

}
