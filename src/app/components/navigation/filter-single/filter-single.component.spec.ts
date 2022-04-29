import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSingleComponent } from './filter-single.component';

describe('FilterSingleComponent', () => {
  let component: FilterSingleComponent;
  let fixture: ComponentFixture<FilterSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
