import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeDokterComponent } from './fee-dokter.component';

describe('FeeDokterComponent', () => {
  let component: FeeDokterComponent;
  let fixture: ComponentFixture<FeeDokterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeDokterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeDokterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
