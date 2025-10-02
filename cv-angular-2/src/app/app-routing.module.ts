
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { SkillsComponent } from './skills.component';
import { ExperienceComponent } from './experience.component';
import { JobsComponent } from './jobs.component';
import { StudiesComponent } from './studies.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'skills', component: SkillsComponent },
  {
    path: 'experience',
    component: ExperienceComponent,
    children: [
      { path: 'jobs', component: JobsComponent },
      { path: 'studies', component: StudiesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
