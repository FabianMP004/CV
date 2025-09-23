import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillFilter',
  standalone: true
})
export class SkillFilterPipe implements PipeTransform {
  transform(skills: string[], filter: string): string[] {
    if (!filter) return skills;
    const lower = filter.toLowerCase();
    return skills.filter(skill => skill.toLowerCase().includes(lower));
  }
}
