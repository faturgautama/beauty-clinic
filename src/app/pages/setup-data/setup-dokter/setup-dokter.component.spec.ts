import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDokterComponent } from './setup-dokter.component';

describe('SetupDokterComponent', () => {
  let component: SetupDokterComponent;
  let fixture: ComponentFixture<SetupDokterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupDokterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupDokterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
