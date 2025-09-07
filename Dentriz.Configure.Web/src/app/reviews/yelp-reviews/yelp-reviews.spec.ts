import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YelpReviews } from './yelp-reviews';

describe('YelpReviews', () => {
  let component: YelpReviews;
  let fixture: ComponentFixture<YelpReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YelpReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YelpReviews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
