import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailObatComponent } from './detail-obat.component';

describe('DetailObatComponent', () => {
  let component: DetailObatComponent;
  let fixture: ComponentFixture<DetailObatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailObatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailObatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
