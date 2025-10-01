import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationExperience } from './education-experience.component';

describe('EducationExperience', () => {
  let component: EducationExperience;
  let fixture: ComponentFixture<EducationExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationExperience]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationExperience);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
