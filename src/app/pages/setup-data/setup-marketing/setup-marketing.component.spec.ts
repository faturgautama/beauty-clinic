import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMarketingComponent } from './setup-marketing.component';

describe('SetupMarketingComponent', () => {
  let component: SetupMarketingComponent;
  let fixture: ComponentFixture<SetupMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupMarketingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
