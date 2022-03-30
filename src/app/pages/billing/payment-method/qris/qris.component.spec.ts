import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrisComponent } from './qris.component';

describe('QrisComponent', () => {
  let component: QrisComponent;
  let fixture: ComponentFixture<QrisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
