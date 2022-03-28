import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelayananPasienComponent } from './pelayanan-pasien.component';

describe('PelayananPasienComponent', () => {
  let component: PelayananPasienComponent;
  let fixture: ComponentFixture<PelayananPasienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelayananPasienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PelayananPasienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
