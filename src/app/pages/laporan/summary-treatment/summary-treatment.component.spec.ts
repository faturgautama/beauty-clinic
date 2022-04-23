import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTreatmentComponent } from './summary-treatment.component';

describe('SummaryTreatmentComponent', () => {
  let component: SummaryTreatmentComponent;
  let fixture: ComponentFixture<SummaryTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
