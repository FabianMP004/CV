
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header.component';
import { Aside } from './aside/aside.component';
import { MainContent } from './main-content/main-content.component';
import { ToolsSkills } from './tools-skills/tools-skills.component';
import { EducationExperience } from './education-experience/education-experience.component';
import { Footer } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Aside,
    MainContent,
    ToolsSkills,
    EducationExperience,
    Footer
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('cv-angular-2');
}
