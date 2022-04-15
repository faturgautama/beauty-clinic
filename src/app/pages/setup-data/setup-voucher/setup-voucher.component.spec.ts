import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupVoucherComponent } from './setup-voucher.component';

describe('SetupVoucherComponent', () => {
  let component: SetupVoucherComponent;
  let fixture: ComponentFixture<SetupVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
