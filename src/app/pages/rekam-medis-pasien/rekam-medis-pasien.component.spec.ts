import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekamMedisPasienComponent } from './rekam-medis-pasien.component';

describe('RekamMedisPasienComponent', () => {
  let component: RekamMedisPasienComponent;
  let fixture: ComponentFixture<RekamMedisPasienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RekamMedisPasienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RekamMedisPasienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
