import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendaftaranPasienComponent } from './pendaftaran-pasien.component';

describe('PendaftaranPasienComponent', () => {
  let component: PendaftaranPasienComponent;
  let fixture: ComponentFixture<PendaftaranPasienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendaftaranPasienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendaftaranPasienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
