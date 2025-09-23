import { Component } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.html',
  styleUrls: ['./aside.css']
})
export class AsideComponent {
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
