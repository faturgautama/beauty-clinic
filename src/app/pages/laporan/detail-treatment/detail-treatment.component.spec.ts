import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTreatmentComponent } from './detail-treatment.component';

describe('DetailTreatmentComponent', () => {
  let component: DetailTreatmentComponent;
  let fixture: ComponentFixture<DetailTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTreatmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
