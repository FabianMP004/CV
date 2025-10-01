import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsSkills } from './tools-skills.component';

describe('ToolsSkills', () => {
  let component: ToolsSkills;
  let fixture: ComponentFixture<ToolsSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsSkills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolsSkills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
