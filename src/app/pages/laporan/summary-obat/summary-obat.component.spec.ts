import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryObatComponent } from './summary-obat.component';

describe('SummaryObatComponent', () => {
  let component: SummaryObatComponent;
  let fixture: ComponentFixture<SummaryObatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryObatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryObatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
