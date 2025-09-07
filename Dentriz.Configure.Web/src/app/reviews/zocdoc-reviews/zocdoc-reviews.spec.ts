import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZocdocReviews } from './zocdoc-reviews';

describe('ZocdocReviews', () => {
  let component: ZocdocReviews;
  let fixture: ComponentFixture<ZocdocReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZocdocReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZocdocReviews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
