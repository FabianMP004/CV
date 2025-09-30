import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Central } from './central';

describe('Central', () => {
  let component: Central;
  let fixture: ComponentFixture<Central>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Central]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Central);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
