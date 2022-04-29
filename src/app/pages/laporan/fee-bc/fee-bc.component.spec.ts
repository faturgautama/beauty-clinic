import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeBcComponent } from './fee-bc.component';

describe('FeeBcComponent', () => {
  let component: FeeBcComponent;
  let fixture: ComponentFixture<FeeBcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeBcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
