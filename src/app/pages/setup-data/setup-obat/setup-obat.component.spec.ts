import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupObatComponent } from './setup-obat.component';

describe('SetupObatComponent', () => {
  let component: SetupObatComponent;
  let fixture: ComponentFixture<SetupObatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupObatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupObatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
