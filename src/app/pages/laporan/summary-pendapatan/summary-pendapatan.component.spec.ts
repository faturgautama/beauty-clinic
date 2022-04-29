import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPendapatanComponent } from './summary-pendapatan.component';

describe('SummaryPendapatanComponent', () => {
  let component: SummaryPendapatanComponent;
  let fixture: ComponentFixture<SummaryPendapatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryPendapatanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPendapatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
