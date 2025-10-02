import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aside',
  imports: [CommonModule, RouterModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class Aside {
  showContact = false;
  showEducation = true;
  showExperience = true;

  toggleContact() {
    this.showContact = !this.showContact;
  }

  toggleEducation() {
    this.showEducation = !this.showEducation;
  }

  toggleExperience() {
    this.showExperience = !this.showExperience;
  }
}
