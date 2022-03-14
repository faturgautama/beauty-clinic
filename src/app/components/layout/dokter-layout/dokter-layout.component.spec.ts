import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokterLayoutComponent } from './dokter-layout.component';

describe('DokterLayoutComponent', () => {
  let component: DokterLayoutComponent;
  let fixture: ComponentFixture<DokterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DokterLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DokterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
