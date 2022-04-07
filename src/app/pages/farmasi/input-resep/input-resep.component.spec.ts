import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputResepComponent } from './input-resep.component';

describe('InputResepComponent', () => {
  let component: InputResepComponent;
  let fixture: ComponentFixture<InputResepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputResepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputResepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
