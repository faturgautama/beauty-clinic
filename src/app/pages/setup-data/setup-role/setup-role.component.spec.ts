import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRoleComponent } from './setup-role.component';

describe('SetupRoleComponent', () => {
  let component: SetupRoleComponent;
  let fixture: ComponentFixture<SetupRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
