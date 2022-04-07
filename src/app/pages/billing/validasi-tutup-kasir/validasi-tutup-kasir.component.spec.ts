import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidasiTutupKasirComponent } from './validasi-tutup-kasir.component';

describe('ValidasiTutupKasirComponent', () => {
  let component: ValidasiTutupKasirComponent;
  let fixture: ComponentFixture<ValidasiTutupKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidasiTutupKasirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidasiTutupKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
