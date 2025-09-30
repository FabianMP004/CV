import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside',
  imports: [CommonModule],
  templateUrl: './aside.html',
  styleUrl: './aside.css'
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
