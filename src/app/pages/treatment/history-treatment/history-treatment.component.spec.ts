import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTreatmentComponent } from './history-treatment.component';

describe('HistoryTreatmentComponent', () => {
  let component: HistoryTreatmentComponent;
  let fixture: ComponentFixture<HistoryTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
