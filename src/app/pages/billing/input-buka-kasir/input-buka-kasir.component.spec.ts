import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBukaKasirComponent } from './input-buka-kasir.component';

describe('InputBukaKasirComponent', () => {
  let component: InputBukaKasirComponent;
  let fixture: ComponentFixture<InputBukaKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputBukaKasirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBukaKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
