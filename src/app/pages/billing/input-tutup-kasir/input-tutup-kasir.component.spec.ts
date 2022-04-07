import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTutupKasirComponent } from './input-tutup-kasir.component';

describe('InputTutupKasirComponent', () => {
  let component: InputTutupKasirComponent;
  let fixture: ComponentFixture<InputTutupKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTutupKasirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTutupKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
