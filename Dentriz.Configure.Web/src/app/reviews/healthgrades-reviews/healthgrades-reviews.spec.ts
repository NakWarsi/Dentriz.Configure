import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthgradesReviews } from './healthgrades-reviews';

describe('HealthgradesReviews', () => {
  let component: HealthgradesReviews;
  let fixture: ComponentFixture<HealthgradesReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthgradesReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthgradesReviews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
