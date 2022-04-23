import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBilingComponent } from './history-biling.component';

describe('HistoryBilingComponent', () => {
  let component: HistoryBilingComponent;
  let fixture: ComponentFixture<HistoryBilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryBilingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
