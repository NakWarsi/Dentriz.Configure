import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsReviews } from './vitals-reviews';

describe('VitalsReviews', () => {
  let component: VitalsReviews;
  let fixture: ComponentFixture<VitalsReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalsReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalsReviews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
