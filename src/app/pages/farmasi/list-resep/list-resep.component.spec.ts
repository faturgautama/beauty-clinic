import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResepComponent } from './list-resep.component';

describe('ListResepComponent', () => {
  let component: ListResepComponent;
  let fixture: ComponentFixture<ListResepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListResepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
