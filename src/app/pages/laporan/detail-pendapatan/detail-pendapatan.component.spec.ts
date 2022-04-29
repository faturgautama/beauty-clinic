import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPendapatanComponent } from './detail-pendapatan.component';

describe('DetailPendapatanComponent', () => {
  let component: DetailPendapatanComponent;
  let fixture: ComponentFixture<DetailPendapatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPendapatanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPendapatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
